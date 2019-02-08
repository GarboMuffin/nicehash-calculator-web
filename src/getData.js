const fs = require("fs");

const logger = require("./logger");
const config = require("./config");

const parseOptions = require("./nicehash-calculator/options/index").parseOptions;
const NiceHashCalculator = require("./nicehash-calculator/calculator/NiceHashCalculator").NiceHashCalculator;

// just get some default options
const options = parseOptions([]);
// then specify what we want to change
options.showHeader = false;
options.showWarnings = false;
options.sleepTime = 2500; // slow enough to avoid rate limits
options.outputHandler = {
  // later redefined in getRawData()
  class: class {}
};

config.DISABLED_COINS.forEach((c) => options.coins.push("-" + c));

// sometimes during testing it can be useful to uncomment this to just enable a couple coins
// options.coins = ["bitcoin", "litecoin"];

function getRawData() {
  return new Promise((resolve, reject) => {
    const result = [];

    options.outputHandler.class = class {
      constructor() {
        this.pretty = false;
      }
      handle(data) {
        logger.info("Updated data for coin " + data.coin.displayName);
        result.push(data);
      }
      finished() {
        resolve(result);
      }
    }

    const calculator = new NiceHashCalculator(options);
    calculator.start()
      .catch((err) => {
        logger.error("Error while running nicehash-calculator:");
        logger.error(err.stack);
        reject(err);
      });
  });
}

function parseData(rawData) {
  // remove 1000%+ ROI coins and 0 ROI coins
  rawData = rawData.filter((coin) => coin.returnOnInvestment <= 10 && coin.returnOnInvestment !== 0);

  // Sort by algorithm, then case name (case insensitive)
  rawData.sort((a, b) => {
    const byAlgo = a.coin.algorithm.niceHash.id - b.coin.algorithm.niceHash.id;
    const aName = a.coin.displayName.toLowerCase();
    const bName = b.coin.displayName.toLowerCase();
    const byName = aName < bName ? -1 : aName > bName ? 1 : 0;
    return byAlgo || byName;
  });

  const date = new Date();
  const data = {
    lastUpdated: date,
    coins: rawData,
  };

  return data;
}

module.exports = function getData() {
  return getRawData()
    .then((rawData) => parseData(rawData));
};
