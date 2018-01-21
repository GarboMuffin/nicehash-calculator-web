const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.set("trust proxy", true);

app.use(morgan("short"));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.referrerPolicy({policy: "no-referrer"}));
app.use(helmet.xssFilter());
app.use(cors());

app.use(express.static("public"));

app.get("/data.json", require("./getData"));

app.use((req, res) => res.status(404).send("404 Not Found"));

module.exports = app;
