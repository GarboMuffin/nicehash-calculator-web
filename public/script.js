(function() {
  "use strict";

  /* Convert UTC dates to your local time */
  function localizeDate(t) {
    return (new Date(t.replace(" (UTC)", ""))).toLocaleString();
  }
  var els = document.getElementsByClassName("utc-text");
  for (var i = 0; i < els.length; i++) {
    els[i].textContent = localizeDate(els[i].textContent);
  }
  els = document.getElementsByClassName("utc-title");
  for (var i = 0; i < els.length; i++) {
    els[i].setAttribute("title", localizeDate(els[i].getAttribute("title")));
  }

  /* Support dark mode */
  document.body.classList.remove('no-js');
  function toggleDark(transition) {
    document.body.classList.toggle("dark");
    localStorage.setItem("userPrefersDark", document.body.classList.contains("dark"));
  }
  document.getElementById("dark-mode-container").addEventListener("click", function(e) {
    toggleDark(true);
    e.preventDefault();
  });
  if (localStorage.getItem("userPrefersDark") === "true") {
    toggleDark(false);
  }
}());
