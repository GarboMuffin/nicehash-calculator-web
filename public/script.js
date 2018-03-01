/*
NiceHash Buyer Profitability Chart

The table is rendered on the server.
You can view the entirety of the raw data at https://nicehash.garbomuffin.com/data.json

This JavaScript converts dates to local time.

Website source: https://github.com/GarboMuffin/nicehash-calculator-web
The thing that does the calculations: https://github.com/GarboMuffin/nicehash-calculator/tree/rewrite
*/

(function() {
  "use strict";

  function getDate(el) {
    return new Date(el.getAttribute("data-time"));
  }

  function dateToStr(date) {
    return date.toLocaleString();
  }

  var lastUpdatedEl = document.getElementById("last-updated");
  lastUpdatedEl.textContent = dateToStr(getDate(lastUpdatedEl));

  var revenueCells = document.getElementsByClassName("revenue");
  for (var i = 0; i < revenueCells.length; i++) {
    var el = revenueCells[i];
    el.setAttribute("title", dateToStr(getDate(el)));
  }
}());
