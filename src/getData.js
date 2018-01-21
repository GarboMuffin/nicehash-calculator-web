const chalk = require("chalk");
const logger = require("./logger");
const config = require("./config");

const getNiceHashData = require("./getNiceHashData");

let niceHashData = {};

function updateData() {
  getNiceHashData().then((rawNiceHashData) => {
    rawNiceHashData.sort((a, b) => {
      const byAlgo = a.coin.niceHashAlgo - b.coin.niceHashAlgo;
      if (byAlgo === 0) {
        return a.coin.displayName - b.coin.displayName;
      } else {
        return byAlgo;
      }
    });
    const date = new Date();
    const data = {
      lastUpdated: date,
      coins: rawNiceHashData,
    };
    niceHashData = data;
  }).catch((err) => {
    logger.error(chalk.red(" > Fatal error updating data:"));
    logger.error(err.stack);
  });
}

setInterval(updateData, config.REFRESH_TIME);
updateData();

module.exports = (req, res) => {
  // res.jsonp(niceHashData);
  res.json(niceHashData);
};
