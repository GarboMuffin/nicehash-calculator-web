const fs = require("fs");
const util = require("util");
const mkdirp = require("mkdirp");

const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const readDir = util.promisify(fs.readdir);

const logger = require("./logger");

mkdirp("data");

async function getSavedData(file = "data.json") {
  try {
    const fileStat = await stat(file);
    if (!fileStat.isFile()) {
      throw new Error("");
    }
  } catch (e) {
    throw new Error("File does not exist");
  }

  const contents = await readFile(file);
  let data;
  try {
    data = JSON.parse(contents);
  } catch (e) {
    throw new Error("Malformed JSON");
  }

  return data;
}

async function listSavedData() {
  let files = await readDir("data");
  files = files.map((file) => file.replace(/\.json$/, ""));
  return files;
}

async function saveData(data) {
  try {
    const stringToWrite = JSON.stringify(data);
    const date = (new Date(data.lastUpdated)).valueOf();
    await writeFile("data.json", stringToWrite);
    await writeFile(`data/${date}.json`, stringToWrite);
    logger.info("Saved data");
  } catch (e) {
    logger.error(" > Couldn't save data:");
    logger.error(e.stack);
  }
}

function renderData(data) {
  const VALUE_PRECISION = 4;

  if (!data.coins || data.coins.length === 0) {
    logger.warn("No data?");
    return {};
  }

  const outputCoins = [];

  const coins = data.coins;

  const getResult = (meta) => {
    const result = {};
    meta.renderData = result;

    const fix = (number) => number.toFixed(VALUE_PRECISION);

    // Throws a + infront of a positive number, used for percents
    const handlePercent = (number) => {
      number = number.toFixed(2);
      if (number > 0) {
        return "+" + number;
      } else {
        return number;
      }
    };

    const hashUnit = meta.coin.algorithm.niceHash.unit.displayName;
    const moneyUnit = "BTC/" + hashUnit + "/day";

    // Add in the data
    result.displayName = meta.coin.displayName + " (" + meta.coin.abbreviation + ")";
    result.algoName = meta.coin.algorithm.displayName;
    result.price = fix(meta.price) + " " + moneyUnit;
    result.revenue = fix(meta.revenue) + " " + moneyUnit;
    result.revenueDate = new Date(meta.rawRevenue.timestamp).toLocaleString();
    result.profit = fix(meta.profit) + " " + moneyUnit;
    result.isProfitable = meta.percentChange > 0;
    result.roi = handlePercent(meta.percentChange * 100) + "%";
    result.lagging = meta.coin.lagging;

    return result;
  };

  const getMostProfitable = () => {
    const result = [];

    for (const coin of coins) {
      const algo = coin.coin.algorithm.niceHash.id;
      const profit = coin.profit;

      const highestCoinOfAlgo = result[algo];
      const highestProfitOfAlgo = highestCoinOfAlgo ? highestCoinOfAlgo.profit : -Infinity;

      if (profit > highestProfitOfAlgo) {
        result[algo] = coin;
      }
    }

    return result;
  };

  for (const coin of coins) {
    const result = getResult(coin);
    outputCoins.push(result);
  }

  const mostProfitable = getMostProfitable();
  for (const coin of mostProfitable) {
    // todo: this if might not be needed
    if (coin === undefined) {
      continue;
    }
    coin.renderData.isMostProfitable = true;
  }
  for (const coin of coins) {
    if (!coin.renderData.isMostProfitable) {
      coin.renderData.isMostProfitable = false;
    }
  }

  const renderedData = {
    coins: outputCoins,
    lastUpdated: data.lastUpdated,
  };

  return renderedData;
}

module.exports.getSavedData = getSavedData;
module.exports.listSavedData = listSavedData;
module.exports.saveData = saveData;
module.exports.renderData = renderData;
