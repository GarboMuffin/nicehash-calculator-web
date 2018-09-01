const winston = require("winston");
const mkdirp = require("mkdirp");

// load dailyroatefile for the rotating log files
require("winston-daily-rotate-file");

// create the logs directory if it doesn't already exist
mkdirp.sync("logs");

module.exports = new winston.Logger({
  exitOnError: false,
  transports: [
    new winston.transports.DailyRotateFile({
      level: "info",
      filename: "./logs/log-",
      datePattern: "yyyy-MM-dd",
      // automatically delete logs after 14 days
      maxFiles: "14d",
    }),
    new winston.transports.Console({
      level: "debug",
      json: false,
      colorize: true,
      timestamp: true,
    }),
  ],
});
