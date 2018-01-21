const winston = require("winston");
const mkdirp = require("mkdirp");

// load dailyroatefile
require("winston-daily-rotate-file");

// create the logs directory becuase winston is too much of a special snowflake to do it itself
mkdirp.sync("logs");

module.exports = new winston.Logger({
  exitOnError: false,
  transports: [
    new winston.transports.DailyRotateFile({
      level: "info",
      filename: "./logs/log-",
      datePattern: "yyyy-MM-dd",
    }),
    new winston.transports.Console({
      level: "debug",
      json: false,
      colorize: true,
      timestamp: true,
    }),
  ],
});
