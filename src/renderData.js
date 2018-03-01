// Converts raw data from nicehash-calculator into more easily parsed data

const VALUE_PRECISION = 4;
const UNKNOWN_ALGORITHM = "Unknown (this is a bug)";

module.exports = (data) => {
  const outputCoins = [];

  const coins = data.coins;

  const getResult = (meta) => {
    const result = {};
    meta.result = result;

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

    const hashUnit = meta.coin.niceHashUnit.displayName;
    const moneyUnit = "BTC/" + hashUnit + "/day";

    // Add in the data
    result.displayName = meta.coin.displayName + " (" + meta.coin.abbreviation + ")";
    result.algoName = meta.coin.niceHashAlgo.displayName || UNKNOWN_ALGORITHM;
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

    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      const algo = coin.coin.niceHashAlgo.id;
      const profit = coin.profit;

      const highestCoinOfAlgo = result[algo];
      const highestProfitOfAlgo = highestCoinOfAlgo ? highestCoinOfAlgo.profit : -Infinity;

      if (profit > highestProfitOfAlgo) {
        result[algo] = coin;
      }
    }

    return result;
  };

  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];
    const result = getResult(coin);
    outputCoins.push(result);
  }

  const mostProfitable = getMostProfitable();
  for (let i = 0; i < mostProfitable.length; i++) {
    const coin = mostProfitable[i];
    if (coin === undefined) {
      continue;
    }
    coin.result.isMostProfitable = true;
  }

  const renderedData = {
    coins: outputCoins,
    lastUpdated: data.lastUpdated,
  };

  return renderedData;
}
