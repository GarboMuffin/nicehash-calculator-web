/* jshint esversion: 6 */

(function() {
  "use strict";

  // Element definitions
  const main = document.getElementById("main");
  const table = document.getElementById("table");
  const lastUpdated = document.getElementById("last-updated");
  const waitMessage = document.getElementById("please-wait");

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
      default: return "Unknown";
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
    // Creates a column
    // Used in row creation
    const createColumn = (text, opts) => {
      const column = createElement("td", opts || {});
      column.textContent = text;
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
        className: percentChange > 0 ? "cell-green" : "cell-red",
      }));

      return row;
    };

    // Add rows for every coin
    const coins = data.coins;
    for (const coin of coins) {
      const row = createRow(coin);
      table.appendChild(row);
    }

    // Set the last updated date
    const date = new Date(data.lastUpdated);
    lastUpdated.textContent = date.toLocaleString();

    // Hide the message saying waiting for data
    waitMessage.style.display = "none";
  }

  getData().then((data) => renderData(data));
}());
