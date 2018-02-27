const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const logger = require("./logger");

const app = express();

app.set("trust proxy", true);

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
// caching has caused some problems in the past
// cloudflare caches things it shouldn't be
app.use(helmet.noCache());
app.use(compression());

app.use(express.static("public"));
app.get("/data.json", cors(), require("./getData"));
app.use((req, res) => res.status(404).send("404 Not Found"));

module.exports = app;
