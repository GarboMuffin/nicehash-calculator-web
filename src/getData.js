const chalk = require("chalk");
const fs = require("fs");
const logger = require("./logger");
const config = require("./config");
const getNiceHashData = require("./getRawData");

let niceHashData = {};

function readExistingData() {
  try {
    const existingData = fs.readFileSync("data.json");
    const data = JSON.parse(existingData.toString());
    niceHashData = data;
    logger.info("Read existing data.json");
  } catch (e) {
    logger.warn("Couldn't load data.json");
  }
}

function updateData() {
  getNiceHashData().then((rawNiceHashData) => {
    // Sort by algorithm then by name
    // TODO: consider sorting by profit instead of name?
    rawNiceHashData.sort((a, b) => {
      const byAlgo = a.coin.niceHashAlgo - b.coin.niceHashAlgo;
      const aName = a.coin.displayName.toLowerCase();
      const bName = b.coin.displayName.toLowerCase();
      const byName = aName < bName ? -1 : aName > bName ? 1 : 0;
      return byAlgo || byName;
    });

    const date = new Date();
    const data = {
      lastUpdated: date,
      coins: rawNiceHashData,
    };
    niceHashData = data;

    // save it to a file so restarts don't have missing data
    fs.writeFile("data.json", JSON.stringify(data), (err) => {
      if (err) {
        logger.error(chalk.red(" > Couldn't save data.json:"));
        logger.error(err.stack);
      } else {
        logger.info("Saved data.json");
      }
    });
  }).catch((err) => {
    logger.error(chalk.red(" > Fatal error updating data:"));
    logger.error(err.stack);
  });
}

readExistingData();
if (process.env.NODE_ENV === "production" || !niceHashData.coins || niceHashData.coins.length === 0) {
  updateData();
  setInterval(updateData, config.REFRESH_TIME);
} else {
  logger.info("Not running updates (data exists and not in production, force an update by deleting data.json)");
}

module.exports = (req, res) => {
  // res.jsonp(niceHashData);
  res.json(niceHashData);
};
