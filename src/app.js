const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const logger = require("./logger");
const getData = require("./getData");
const dataOperations = require("./data");
const config = require("./config");

const renderIndex = require("./routes/index");
const renderHistoryTable = require("./routes/history/table");
const renderHistoryList = require("./routes/history/list");
const render = require("./routes/render");

if (config.IN_PRODUCTION) {
  logger.info("Production environment");
} else {
  logger.info("Development environment");
}

if (config.ALLOW_UPDATES) {
  logger.info("Automated data updates are enabled");
} else {
  logger.info("Automated data updates are disabled; change this by editing src/config.js");
}

const state = {
  data: {},
  renderedData: {},
};

function handlePromiseError(err) {
  logger.error(" > PROMISE ERROR:");
  if (err && err.stack) {
    logger.error(err.stack);
  } else {
    logger.error(err);
  }
}

//
// DATA
//

function setData(data, writeData=true) {
  state.data = data;
  state.renderedData = dataOperations.renderData(data);
  if (writeData) {
    dataOperations.saveData(data).catch((err) => handlePromiseError(err));
  }
}

function loadSavedData() {
  dataOperations.getSavedData().then((data) => {
    setData(data, false);
    if (config.IN_PRODUCTION && !config.DISABLE_UPDATES) {
      const currentDate = Date.now();
      const dataDate = new Date(data.lastUpdated);
      const timeSince = currentDate - dataDate;
      if (timeSince >= config.REFRESH_TIME || isNaN(timeSince)) {
        updateData();
      } else {
        setUpdateTimeout(config.REFRESH_TIME - timeSince);
      }
    }
  }).catch((err) => updateData());
}

function updateData() {
  getData(this).then((data) => {
    if (!data || !data.coins || data.coins.length === 0) {
      logger.error("Update returned bad data. Aborting update.");
    } else {
      setData(data);
    }
    if (config.ALLOW_UPDATES) {
      setUpdateTimeout();
    }
  }).catch((err) => handlePromiseError(err));
}

function setUpdateTimeout(timeout = config.REFRESH_TIME) {
  logger.info("Setting update interval (" + timeout + "ms)");
  setTimeout(() => updateData(), timeout);
}

function handleSendData(req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.json(state.data);
}

//
// ACTUAL STUFF
//

const app = express();

app.set("case sensitive routing", true);
app.set("trust proxy", config.REVERSE_PROXY);
app.set("strict routing", true);
app.set("view engine", "pug");
app.set("views", "src/views");
app.set("env", config.IN_PRODUCTION ? "production" : "development");

app.use(morgan("short", {
  stream: {
    // simple wrapper for winston and removes trailing newline
    write: (m) => logger.info(m.replace(/\n$/, "")),
  },
}));

app.use(helmet.hidePoweredBy());
app.use(express.static("public"));

app.get("/", (req, res) => renderIndex(req, res, state));
app.get("/data.json", handleSendData);
// redirect "/history" to "/history/" because of strict routing
app.get("/history", (req, res) => res.redirect(req.path + "/"));
app.get("/history/", renderHistoryList);
app.get("/history.json", renderHistoryList.json);
app.get("/history/:date", renderHistoryTable);
app.get("/history/:date.json", renderHistoryTable.json);

app.get("/calculate", (req, res) => render(res, "calculate"));

app.use((req, res) => res.status(404).send("404 Not Found"));

loadSavedData();

module.exports = app;
