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
      const moneyUnit = "BTC/" + hashUnit + "/day";

      // Add in the data
      row.appendChild(createColumn(meta.coin.displayName + " (" + meta.coin.abbreviation + ")")); // name
      row.appendChild(createColumn(meta.coin.niceHashAlgo.displayName || UNKNOWN_ALGORITHM)); // algo
      row.appendChild(createColumn(fix(meta.price) + " " + moneyUnit)); // price
      row.appendChild(createColumn(fix(meta.revenue.revenue) + " " + moneyUnit, {
        title: new Date(meta.revenue.timestamp).toLocaleString(),
      })); // revenue
      row.appendChild(createColumn(fix(meta.profit) + " " + moneyUnit)); // profit

      // ROI needs some special care
      const percentChange = handlePercent(meta.percentChange * 100);
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

    console.log("The data is stored in `window.data`");
    window.data = coins;
  }

  function start() {
    fetch("data.json")
      .then((data) => data.json())
      .then((data) => renderData(data));
  }

  // if a fetch() method exists then skip a request for polyfills as they are not needed
  if ("fetch" in window) {
    start();
  } else {
    // otherwise have to get polyfills
    var script = document.createElement("script");
    script.src = "https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch&rum=0";
    document.body.appendChild(script);
    script.onload = function() {
      start();
    };
  }
}());
