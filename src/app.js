const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const logger = require("./logger");
const getData = require("./getData");
const getSavedData = require("./getSavedData");
const renderData = require("./renderData");
const saveData = require("./saveData");

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
    }).catch((err) => this.handlePromiseError(err));
  }

  updateData() {
    getData(this).then((data) => {
      this.setData(data);
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
    opts.googleAnalyticsCode = this.config.GOOGLE_ANALYTICS_CODE;
    res.render(page, opts);
  }

  handleRenderIndex(req, res) {
    this.render(res, "index", {
      data: this.renderedData,
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
