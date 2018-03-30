(function() {
  "use strict";

  // 1. Convert dates to local time
  function convert(t) {
    return (new Date(t.replace(" (UTC)", ""))).toLocaleString();
  }
  function fixDates(els, type) {
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (type === "text") {
        el.textContent = convert(el.textContent);
      } else if (type === "title") {
        el.setAttribute("title", convert(el.getAttribute("title")));
      }
    }
  }
  fixDates(document.getElementsByClassName("utc-text"), "text");
  fixDates(document.getElementsByClassName("utc-title"), "title");

  // 2. Error reporting (through google analytics)
  if (window.gtag) {
    function reportError(d) {
      gtag("event", "exception", {
        exDescription: d,
      });
    }

    if (document.getElementsByClassName("error").length > 0) {
      if (document.getElementById("no-update")) {
        reportError("no update");
      } else if (document.getElementById("few-coins")) {
        reportError("few coins");
      } else if (document.getElementById("no-data")) {
        reportError("no data");
      }
    }
  }
}());
