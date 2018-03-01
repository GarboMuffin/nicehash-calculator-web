(function() {
  "use strict";

  // Element definitions
  const table = document.getElementById("table");
  const lastUpdated = document.getElementById("last-updated");
  const waitMessage = document.getElementById("please-wait");
  const missingDataMessage = document.getElementById("no-data");

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
    return fetch("renderedData.json").then((e) => e.json());
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

      // Add in the data
      row.appendChild(createColumn(meta.displayName));
      row.appendChild(createColumn(meta.algoName));
      row.appendChild(createColumn(meta.price));
      row.appendChild(createColumn(meta.revenue, {
        title: new Date(meta.revenueDate).toLocaleString(),
      }));
      row.appendChild(createColumn(meta.profit));
      row.appendChild(createColumn(meta.roi, {
        // Color a percent change's cell green or red if it's positive or negative
        className: (meta.isProfitable ? "cell-green" : "cell-red") + " cell-percent-change",
      }));

      if (meta.isMostProfitable) {
        row.className = "highlight";
      }

      return row;
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

    // Set the last updated date
    const date = new Date(data.lastUpdated);
    lastUpdated.textContent = date.toLocaleString();

    // Hide the message saying waiting for data
    waitMessage.style.display = "none";
  }

  function start() {
    getData().then((data) => renderData(data));
  }

  // if a fetch() method exists then skip a request for polyfills as they are not needed
  if ("fetch" in window) {
    start();
  } else {
    // otherwise have to get polyfills
    var script = document.createElement("script");
    script.src = "https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch&rum=0";
    document.body.appendChild(script);
    script.onload = start;
  }
}());
