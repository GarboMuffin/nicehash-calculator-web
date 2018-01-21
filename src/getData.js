const chalk = require("chalk");
const logger = require("./logger");
const config = require("./config");
const getNiceHashData = require("./getNiceHashData");

let niceHashData = {};

function updateData() {
  getNiceHashData().then((rawNiceHashData) => {
    rawNiceHashData.sort((a, b) => {
      // Sort by algorithm then by name
      // TODO: consider sorting by profit instead of name?
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
