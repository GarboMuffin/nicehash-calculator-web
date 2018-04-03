(function() {
  "use strict";

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
}());
