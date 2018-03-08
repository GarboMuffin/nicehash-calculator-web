// Converts raw data from nicehash-calculator into more easily parsed data

const logger = require("./logger");

const VALUE_PRECISION = 4;

module.exports = (data) => {
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
    result.revenue = fix(meta.revenue.revenue) + " " + moneyUnit;
    result.revenueDate = new Date(meta.revenue.timestamp).toLocaleString();
    result.profit = fix(meta.profit) + " " + moneyUnit;
    result.isProfitable = meta.percentChange > 0;
    result.roi = handlePercent(meta.percentChange * 100) + "%";

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
