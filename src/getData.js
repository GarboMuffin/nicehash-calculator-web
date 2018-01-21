const chalk = require("chalk");

const getNiceHashData = require("./getNiceHashData");

let niceHashData = {};

function updateData() {
  getNiceHashData().then((rawNiceHashData) => {
    const date = Date.now();
    const data = {
      lastUpdated: date,
      coins: rawNiceHashData,
    };
    niceHashData = data;
  }).catch((err) => {
    console.error(chalk.red(" > Fatal error updating data:"));
    console.error(err.stack);
  });
}

setInterval(updateData, 1000 * 60 * 30); // 30 minutes
updateData();

module.exports = (req, res) => {
  // res.jsonp(niceHashData);
  res.json(niceHashData);
};
