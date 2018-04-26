(function(){
  "use strict";

  const coinDropdown = document.getElementById("coin-dropdown");
  const defaultOption = document.getElementById("default-option");
  const button = document.getElementById("button");
  const outputContainer = document.getElementById("output");
  const table = document.getElementById("table");

  const outputName = document.getElementById("output-name");
  const outputAlgorithm = document.getElementById("output-algorithm");
  const outputPrice = document.getElementById("output-price");
  const outputRevenue = document.getElementById("output-revenue");
  const outputRoi = document.getElementById("output-roi");

  outputContainer.style.display = "none";

  const precision = 4;

  function fetchCorsResource(url) {
    return fetch("https://cors-anywhere.herokuapp.com/" + url);
  }

  function getAllCoins() {
    return fetch("/data.json")
      .then((res) => res.json());
  }

  function getNiceHashPrices() {
    return fetchCorsResource("https://api.nicehash.com/api?method=stats.global.current")
      .then((res) => res.json());
  }

  function dataToCoins(data) {
    const rawCoins = data.coins;
    const coins = [];
    rawCoins.forEach((rawCoin) => {
      const metadata = rawCoin.coin;

      const id = metadata.id;
      const displayName = metadata.displayName;
      const abbreviation = metadata.abbreviation;
      const algoName = metadata.algorithm.displayName;

      const niceHashId = metadata.algorithm.niceHash.id;
      const niceHashUnit = metadata.algorithm.niceHash.unit.hashes;
      const unitName = metadata.algorithm.niceHash.unit.displayName;
      const whatToMineUnit = metadata.algorithm.whatToMine.unit.hashes;

      const coin = {
        displayName,
        abbreviation,
        algoName,
        id,
        niceHashId,
        niceHashUnit,
        whatToMineUnit,
        unitName,
      };
      coins[id] = coin;
    });
    return coins;
  }

  function addCoinsToDropdown(coins) {
    coins.forEach((coin) => {
      const option = document.createElement("option");
      option.value = coin.id;
      option.textContent = `${coin.displayName} (${coin.abbreviation}) (${coin.algoName})`;
      coinDropdown.appendChild(option);
    });
    defaultOption.textContent = "Please select a coin";
  }

  function start(rawData, nicehash) {
    const coins = dataToCoins(rawData);
    addCoinsToDropdown(coins);

    button.addEventListener("click", () => {
      const selectedValue = coinDropdown.value;
      const coin = coins[selectedValue];
      const price = +nicehash.result.stats[coin.niceHashId].price;
      getRevenueForCoin(coin)
        .then((revenue) => outputResult(coin, price, revenue));
    });
  }

  function outputResult(coin, price, revenue) {
    function getRoi() {
      const change = ((revenue.value / price - 1) * 100).toFixed(precision) + "%";
      if (change >= 0) {
        return "+" + change;
      }
      return change;
    }
    outputContainer.style.display = "block";
    outputName.textContent = `${coin.displayName} (${coin.abbreviation})`;
    outputAlgorithm.textContent = coin.algoName;
    outputPrice.textContent = `${price.toFixed(precision)} BTC/${coin.unitName}/day`;
    outputRevenue.title = revenue.timestamp.toLocaleString();
    outputRevenue.textContent = `${revenue.value.toFixed(precision)} BTC/${coin.unitName}/day`;
    outputRoi.textContent = getRoi();
  }

  function getRevenueForCoin(coin) {
    return fetchCorsResource(`https://whattomine.com/coins/${coin.id}.json?hr=${coin.niceHashUnit / coin.whatToMineUnit}`)
      .then((res) => res.json())
      .then((data) => {
        const revenue = +data.btc_revenue;
        const timestamp = new Date(data.timestamp * 1000);
        return {value: revenue, timestamp};
      });
  }

  getNiceHashPrices()
    .then((nicehash) => {
      getAllCoins()
        .then((data) => start(data, nicehash));
    });
}());
