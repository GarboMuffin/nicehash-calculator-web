// Converts UTC dates to local time

(function() {
  "use strict";

  function date(d) {
    return (new Date(d.replace(" (UTC)", ""))).toLocaleString();
  }

  var lastUpdatedEl = document.getElementById("last-updated");
  lastUpdatedEl.textContent = date(lastUpdatedEl.textContent);

  var revenueCells = document.getElementsByClassName("revenue");
  for (var i = 0; i < revenueCells.length; i++) {
    var el = revenueCells[i];
    el.setAttribute("title", date(el.getAttribute("title")));
  }
}());
