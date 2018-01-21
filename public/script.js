/* jshint esversion: 6 */

(function() {
  "use strict";

  const main = document.getElementById("main");
  const table = document.getElementById("table");
  const lastUpdated = document.getElementById("last-updated");
  const waitMessage = document.getElementById("please-wait");

  const VALUE_PRECISION = 4;

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

  function getData() {
    return fetch("data.json").then((e) => e.json());
  }

  function renderData(data) {
    const createRow = (meta) => {
      const row = document.createElement("tr");

      const createColumn = (text, opts) => {
        const column = createElement("td", opts || {});
        column.textContent = text;
        return column;
      };

      const fix = (number) => {
        return number.toFixed(VALUE_PRECISION);
      };

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

      row.appendChild(createColumn(meta.coin.displayName + " (" + meta.coin.abbreviation + ")"));
      row.appendChild(createColumn(fix(meta.price) + " " + moneyUnit));
      row.appendChild(createColumn(fix(meta.revenue) + " " + moneyUnit));
      row.appendChild(createColumn(fix(meta.profit) + " " + moneyUnit));

      const percentChange = handlePercent((meta.percentChange - 1) * 100);
      row.appendChild(createColumn(percentChange + "%", {
        className: percentChange > 0 ? "cell-green" : "cell-red",
      }));

      return row;
    };

    const coins = data.coins;
    for (const coin of coins) {
      const row = createRow(coin);
      table.appendChild(row);
    }

    const date = new Date(data.lastUpdated);
    lastUpdated.textContent = date.toLocaleString();

    waitMessage.style.display = "none";
  }

  getData().then((data) => renderData(data));
}());
