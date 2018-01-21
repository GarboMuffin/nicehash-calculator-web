"use strict";

(function () {
  "use strict";

  // Element definitions

  var main = document.getElementById("main");
  var table = document.getElementById("table");
  var lastUpdated = document.getElementById("last-updated");
  var waitMessage = document.getElementById("please-wait");
  var missingDataMessage = document.getElementById("no-data");

  // How many decimals to have in most numbers
  var VALUE_PRECISION = 4;

  // Convert a Nicehash API algorithm id to a human readable string
  function nameForAlgorithm(algo) {
    switch (algo) {
      case 0:
        return "Scrypt";
      case 1:
        return "SHA256";
      case 2:
        return "ScryptNf";
      case 3:
        return "X11";
      case 4:
        return "X13";
      case 5:
        return "Keccak";
      case 6:
        return "X15";
      case 7:
        return "Nist5";
      case 8:
        return "NeoScrypt";
      case 9:
        return "Lyra2RE";
      case 10:
        return "WhirlpoolX";
      case 11:
        return "Qubit";
      case 12:
        return "Quark";
      case 13:
        return "Axiom";
      case 14:
        return "Lyra2REv2";
      case 15:
        return "ScryptJaneNf16";
      case 16:
        return "Blake256r8";
      case 17:
        return "Blake256r14";
      case 18:
        return "Blake256r8vnl";
      case 19:
        return "Hodl";
      case 20:
        return "DaggerHashimoto";
      case 21:
        return "Decred";
      case 22:
        return "CryptoNight";
      case 23:
        return "Lbry";
      case 24:
        return "Equihash";
      case 25:
        return "Pascal";
      case 26:
        return "X11Gost";
      case 27:
        return "Sia";
      case 28:
        return "Blake2s";
      case 29:
        return "Skunk";
      default:
        return "Unknown";
    }
  }

  // Create an element of type `el` with properties `opts`
  function createElement(el, opts) {
    var element = document.createElement(el);
    for (var key in opts) {
      if (!opts.hasOwnProperty(key)) {
        continue;
      }
      var val = opts[key];
      element[key] = val;
    }
    return element;
  }

  // Fetches the JSON data
  function getData() {
    return fetch("data.json").then(function (e) {
      return e.json();
    });
  }

  // Renders data from the fetch
  function renderData(data) {
    // Creates a column
    // Used in row creation
    var createColumn = function createColumn(text, opts) {
      var column = createElement("td", opts || {});
      column.textContent = text;
      return column;
    };

    // Creates a row using coin metadata
    var createRow = function createRow(meta) {
      // Make the row element
      var row = document.createElement("tr");

      // Fixes a number to the set VALUE_PRECISION
      var fix = function fix(number) {
        return number.toFixed(VALUE_PRECISION);
      };

      // Throws a + infront of a positive number, used for percents
      var handlePercent = function handlePercent(number) {
        number = number.toFixed(2);
        if (number > 0) {
          return "+" + number;
        } else {
          return number;
        }
      };

      var hashUnit = meta.coin.niceHashUnit.displayName;
      var moneyUnit = "BTC/day/" + hashUnit;

      // Add in the data
      row.appendChild(createColumn(meta.coin.displayName + " (" + meta.coin.abbreviation + ")"));
      row.appendChild(createColumn(nameForAlgorithm(meta.coin.niceHashAlgo)));
      row.appendChild(createColumn(fix(meta.price) + " " + moneyUnit));
      row.appendChild(createColumn(fix(meta.revenue) + " " + moneyUnit));
      row.appendChild(createColumn(fix(meta.profit) + " " + moneyUnit));

      var percentChange = handlePercent((meta.percentChange - 1) * 100);
      row.appendChild(createColumn(percentChange + "%", {
        // Color a percent change's cell green or red if it's positive or negative
        className: (percentChange > 0 ? "cell-green" : "cell-red") + " cell-percent-change"
      }));

      return row;
    };

    var getMostProfitable = function getMostProfitable() {
      // Eventually returned back
      var result = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data.coins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var coin = _step.value;

          var algo = coin.coin.niceHashAlgo;
          var profit = coin.profit;

          var highestCoinOfAlgo = result[algo];
          var highestProfitOfAlgo = highestCoinOfAlgo ? highestCoinOfAlgo.profit : -Infinity;

          if (profit > highestProfitOfAlgo) {
            result[algo] = coin;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return result;
    };

    // If the data doesn't have any coins or if the list has length 0 there is no data
    if (!data.coins || data.coins.length === 0) {
      missingDataMessage.style.display = "block";
    } else {
      // Add rows for every coin
      var coins = data.coins;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = coins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var coin = _step2.value;

          var row = createRow(coin);
          coin.row = row;
          table.appendChild(row);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    // Find the most profitable coins and give them the highlight class
    var mostProfitable = getMostProfitable();
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = mostProfitable[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _coin = _step3.value;

        if (_coin === undefined) {
          continue;
        }
        _coin.row.classList.add("highlight");
      }

      // Set the last updated date
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var date = new Date(data.lastUpdated);
    lastUpdated.textContent = date.toLocaleString();

    // Hide the message saying waiting for data
    waitMessage.style.display = "none";
  }

  getData().then(function (data) {
    return renderData(data);
  });
})();