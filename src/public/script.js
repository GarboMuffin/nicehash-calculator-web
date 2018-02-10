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

  // Conversion table of NiceHash algorithm ID to human readable string
  const ALGORITHM_NAMES = [
    "Scrypt", // 0
    "SHA256", // 1
    "ScryptNf", // 2
    "X11", // 3
    "X13", // 4
    "Keccak", // 5
    "X15", // 6
    "Nist5", // 7
    "NeoScrypt", // 8
    "Lyra2RE", // 9
    "WhirlpoolX", // 10
    "Qubit", // 11
    "Quark", // 12
    "Axiom", // 13
    "Lyra2REv2", // 14
    "ScryptJaneNf16", // 15
    "Blake256r8", // 16
    "Blake256r14", // 17
    "Blake256r8vnl", // 18
    "Hodl", // 19
    "DaggerHashimoto", // 20
    "Decred", // 21
    "CryptoNight", // 22
    "Lbry", // 23
    "Equihash", // 24
    "Pascal", // 25
    "X11Gost", // 26
    "Sia", // 27
    "Blake2s", // 28
    "Skunk", // 29
  ];

  // When an algo id has no matching readable name
  const UNKNOWN_ALGORITHM = "Unknown (this is a bug)";

  // Create an element of type `el` with properties `opts`
  function createElement(el, opts) {
    const element = document.createElement(el);
    for (const key in opts) {
      if (!opts.hasOwnProperty(key)) {
        continue;
      }
      element[key] = opts[key];
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
      row.appendChild(createColumn(ALGORITHM_NAMES[meta.coin.niceHashAlgo] || UNKNOWN_ALGORITHM));
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
