(function() {
  "use strict";

  // Element definitions
  const main = document.getElementById("main");
  const table = document.getElementById("table");
  const lastUpdated = document.getElementById("last-updated");
  const waitMessage = document.getElementById("please-wait");
  const missingDataMessage = document.getElementById("no-data");

  // How many decimals to have in most numbers
  const VALUE_PRECISION = 4;

  // Convert a Nicehash API algorithm id to a human readable string
  function nameForAlgorithm(algo) {
    switch (algo) {
      case 0: return "Scrypt";
      case 1: return "SHA256";
      case 2: return "ScryptNf";
      case 3: return "X11";
      case 4: return "X13";
      case 5: return "Keccak";
      case 6: return "X15";
      case 7: return "Nist5";
      case 8: return "NeoScrypt";
      case 9: return "Lyra2RE";
      case 10: return "WhirlpoolX";
      case 11: return "Qubit";
      case 12: return "Quark";
      case 13: return "Axiom";
      case 14: return "Lyra2REv2";
      case 15: return "ScryptJaneNf16";
      case 16: return "Blake256r8";
      case 17: return "Blake256r14";
      case 18: return "Blake256r8vnl";
      case 19: return "Hodl";
      case 20: return "DaggerHashimoto";
      case 21: return "Decred";
      case 22: return "CryptoNight";
      case 23: return "Lbry";
      case 24: return "Equihash";
      case 25: return "Pascal";
      case 26: return "X11Gost";
      case 27: return "Sia";
      case 28: return "Blake2s";
      case 29: return "Skunk";
      default: return "Unknown <small>(bug, please report this)</small>";
    }
  }

  // Create an element of type `el` with properties `opts`
  function createElement(el, opts) {
    const element = document.createElement(el);
    for (const key in opts) {
      if (!opts.hasOwnProperty(key)) {
        continue;
      }
      const val = opts[key];
      element[key] = val;
    }
    return element;
  }

  // Fetches the JSON data
  function getData() {
    return fetch("data.json").then((e) => e.json());
  }

  // Renders data from the fetch
  function renderData(data) {
    const coins = data.coins;

    // Creates a column
    // Used in row creation
    const createColumn = (text, opts) => {
      const column = createElement("td", opts || {});
      column.innerHTML = text;
      return column;
    };

    // Creates a row using coin metadata
    const createRow = (meta) => {
      // Make the row element
      const row = document.createElement("tr");

      // Fixes a number to the set VALUE_PRECISION
      const fix = (number) => {
        return number.toFixed(VALUE_PRECISION);
      };

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
      const moneyUnit = "BTC/day/" + hashUnit;

      // Add in the data
      row.appendChild(createColumn(meta.coin.displayName + " (" + meta.coin.abbreviation + ")"));
      row.appendChild(createColumn(nameForAlgorithm(meta.coin.niceHashAlgo)));
      row.appendChild(createColumn(fix(meta.price) + " " + moneyUnit));
      row.appendChild(createColumn(fix(meta.revenue) + " " + moneyUnit));
      row.appendChild(createColumn(fix(meta.profit) + " " + moneyUnit));

      const percentChange = handlePercent((meta.percentChange - 1) * 100);
      row.appendChild(createColumn(percentChange + "%", {
        // Color a percent change's cell green or red if it's positive or negative
        className: (percentChange > 0 ? "cell-green" : "cell-red") + " cell-percent-change",
      }));

      return row;
    };

    const getMostProfitable = () => {
      // Eventually returned back
      const result = [];

      for (let i = 0; i < coins.length; i++) {
        const coin = coins[i];
        const algo = coin.coin.niceHashAlgo;
        const profit = coin.profit;

        const highestCoinOfAlgo = result[algo];
        const highestProfitOfAlgo = highestCoinOfAlgo ? highestCoinOfAlgo.profit : -Infinity;

        if (profit > highestProfitOfAlgo) {
          result[algo] = coin;
        }
      }

      return result;
    };

    // If the data doesn't have any coins or if the list has length 0 there is no data
    if (!coins || coins.length === 0) {
      missingDataMessage.style.display = "block";
    } else {
      // Add rows for every coin
      for (let i = 0; i < coins.length; i++) {
        const coin = coins[i];
        const row = createRow(coin);
        coin.row = row;
        table.appendChild(row);
      }
    }

    // Find the most profitable coins and give them the highlight class
    const mostProfitable = getMostProfitable();
    for (let i = 0; i < mostProfitable.length; i++) {
      const coin = mostProfitable[i];

      if (coin === undefined) {
        continue;
      }

      // classList is better but old versions of IE don't support it
      // yes I know i'm just that petty
      if (coin.row.className === "") {
        coin.row.className = "highlight";
      } else {
        coin.row.className += " highlight";
      }
    }

    // Set the last updated date
    const date = new Date(data.lastUpdated);
    lastUpdated.textContent = date.toLocaleString();

    // Hide the message saying waiting for data
    waitMessage.style.display = "none";
  }

  getData().then(renderData);
}());
