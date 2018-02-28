const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");

const logger = require("./logger");
const getData = require("./getData");

class Application {
  constructor(app) {
    this.config = require("./config");
    this.inProduction = process.env.NODE_ENV === "production";
    this.data = {};
    this.server = app;

    if (this.inProduction) {
      logger.info("Running in production mode");
    } else {
      logger.info("Running in development mode");
    }

    app.set("trust proxy", true);
    app.set("view engine", "pug");

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
    app.use((req, res, next) => {
      res.set("Cache-Control", "no-cache");
      next();
    });
    app.use(compression());

    app.use(express.static("public"));
    app.get("/", (req, res) => this.handleRenderIndex(req, res));
    app.get("/beta", (req, res) => this.handleRenderBeta(req, res));
    app.get("/data.json", cors(), (req, res) => this.handleSendData(req, res));
    app.use((req, res) => res.status(404).send("404 Not Found"));

    this.updateData();
  }

  updateData() {
    getData(this).then((data) => {
      this.data = data;
      if (this.inProduction) {
        this.startUpdateTimeout();
      }
    });
  }

  render(res, page, opts = {}) {
    opts.inProduction = this.inProduction;
    res.render(page, opts);
  }

  startUpdateTimeout() {
    logger.info("Setting update interval");
    setTimeout(() => this.updateData(), this.config.REFRESH_TIME);
  }

  handleRenderIndex(req, res) {
    this.render(res, "index");
  }

  handleSendData(req, res) {
    res.json(this.data);
  }

  handleRenderBeta(req, res) {
    this.render(res, "beta", {
      data: this.data,
    });
  }
}

const server = express();
const app = new Application(server);

module.exports = app;
