/* jshint esversion: 6 */

(function() {
  "use strict";

  const main = document.getElementById("main");
  const table = document.getElementById("table");

  function getData() {
    return fetch("data.json").then((e) => e.json());
  }

  function renderData(data) {
    const createRow = (meta) => {
      const row = document.createElement("tr");

      const createColumn = (text) => {
        const column = document.createElement("td");
        column.textContent = text;
        return column;
      };

      row.appendChild(createColumn(meta.coin.displayName));
      row.appendChild(createColumn(meta.price));
      row.appendChild(createColumn(meta.revenue));
      row.appendChild(createColumn(meta.profit));
      row.appendChild(createColumn((meta.percentChange - 1) * 100));

      return row;
    };

    const coins = data.coins;
    for (const coin of coins) {
      const row = createRow(coin);
      table.appendChild(row);
    }
  }

  getData().then((data) => renderData(data));
}());
