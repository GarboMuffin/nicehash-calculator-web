const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const logger = require("./logger");
const getData = require("./getData");
const dataOperations = require("./data");
const config = require("./config");

const handleCSPViolation = require("./routes/csp");
const renderIndex = require("./routes/index");
const renderHistoryTable = require("./routes/history/table");
const renderHistoryList = require("./routes/history/list");
const render = require("./routes/render");

if (config.IN_PRODUCTION) {
  logger.info("Running in production mode");
} else {
  logger.info("Running in development mode");
}

const state = {
  data: {},
  renderedData: {},
};

function handlePromiseError(err) {
  logger.error(" > PROMISE ERROR:");
  logger.error(err.stack);
}

//
// DATA
//

function setData(data) {
  state.data = data;
  state.renderedData = dataOperations.renderData(data);
  dataOperations.saveData(data).catch((err) => handlePromiseError(err));
}

function loadSavedData() {
  dataOperations.getSavedData().then((data) => {
    setData(data);
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
    if (config.IN_PRODUCTION) {
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
app.set("trust proxy", "loopback");
app.set("view engine", "pug");
app.set("views", "src/views");

app.use(morgan("short", {
  stream: {
    // simple wrapper for winston and removes trailing newline
    write: (m) => logger.info(m.replace(/\n$/, "")),
  },
}));

// security things or something?
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(helmet.referrerPolicy({policy: "no-referrer"}));
app.use(helmet.contentSecurityPolicy({
  directives: {
    // this isn't the most secure, but it's better than nothing
    defaultSrc: ["'self'"],
    connectSrc: ["*"],
    reportUri: "/report-csp-violation",
  },
}));

app.use(express.static("public"));

app.get("/", (req, res) => renderIndex(req, res, state));
app.get("/data.json", handleSendData);
app.get("/history/", renderHistoryList);
app.get("/history.json", renderHistoryList.json);
app.get("/history/:date", renderHistoryTable);
app.get("/history/:date.json", renderHistoryTable.json);

app.get("/calculate", (req, res) => render(res, "calculate"));
app.post("/report-csp-violation", express.json({type: "*/*"}), handleCSPViolation);

app.use((req, res) => res.status(404).send("404 Not Found"));

loadSavedData();

module.exports = app;
