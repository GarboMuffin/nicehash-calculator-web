const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const logger = require("./logger");
const getData = require("./getData");
const getSavedData = require("./getSavedData");
const renderData = require("./renderData");
const saveData = require("./saveData");
const listSavedData = require("./listSavedData");

class Application {
  constructor(app) {
    this.config = require("./config");
    this.inProduction = process.env.NODE_ENV === "production";
    this.data = {};
    this.renderedData = {};
    this.server = app;

    if (this.inProduction) {
      logger.info("Running in production mode");
    } else {
      logger.info("Running in development mode");
    }

    app.set("case sensitive routing", true);
    app.set("strict routing", true);
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

    app.use(express.static("public"));
    app.get("/", (req, res) => this.handleRenderIndex(req, res));
    app.get("/data.json", (req, res) => this.handleSendData(req, res));
    app.get("/old/", (req, res) => this.handleRenderOldList(req, res));
    app.get("/old/:date", (req, res, next) => this.handleRenderOld(req, res, next));
    app.use((req, res) => res.status(404).send("404 Not Found"));

    this.loadSavedData();
  }

  handlePromiseError(err) {
    logger.error(" > PROMISE ERROR:");
    logger.error(err.stack);
  }

  //
  // DATA
  //

  setData(data) {
    this.data = data;
    this.renderedData = renderData(data);
    saveData(data).catch((err) => this.handlePromiseError(err));
  }

  loadSavedData() {
    getSavedData().then((data) => {
      this.setData(data);
      if (this.inProduction && !this.config.DISABLE_UPDATES) {
        const currentDate = Date.now();
        const dataDate = new Date(data.lastUpdated);
        const timeSince = currentDate - dataDate;
        if (timeSince >= this.config.REFRESH_TIME || isNaN(timeSince)) {
          this.updateData();
        } else {
          this.setUpdateTimeout(this.config.REFRESH_TIME - timeSince);
        }
      }
    }).catch((err) => this.updateData());
  }

  updateData() {
    getData(this).then((data) => {
      if (!data || !data.coins || data.coins.length === 0) {
        logger.error("Update returned bad data. Aborting update.");
      } else {
        this.setData(data);
      }
      if (this.inProduction) {
        this.setUpdateTimeout();
      }
    }).catch((err) => this.handlePromiseError(err));
  }

  setUpdateTimeout(timeout = this.config.REFRESH_TIME) {
    logger.info("Setting update interval (" + timeout + "ms)");
    setTimeout(() => this.updateData(), timeout);
  }

  //
  // ROUTES
  //

  render(res, page, opts = {}) {
    opts.inProduction = this.inProduction;
    res.render(page, opts);
  }

  handleRenderIndex(req, res) {
    this.render(res, "index", {
      data: this.renderedData,
      refreshTime: this.config.REFRESH_TIME,
    });
  }

  async handleRenderOld(req, res, next) {
    const dateParam = req.params.date;
    const file = `data/${dateParam}.json`;
    let data;
    try {
      data = await getSavedData(file);
    } catch (e) {
      next();
      return;
    }
    data.coins = data.coins.map((coin) => coin.renderData);
    this.render(res, "old/table", {
      sourceDate: new Date(+dateParam),
      data: data,
    });
  }

  async handleRenderOldList(req, res) {
    const files = await listSavedData();
    this.render(res, "old/list", {
      data: files,
    });
  }

  handleSendData(req, res) {
    res.set("Access-Control-Allow-Origin", "*");
    res.json(this.data);
  }
}

const server = express();
const app = new Application(server);

module.exports = app;
