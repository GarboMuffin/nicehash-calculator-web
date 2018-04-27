"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Prices type
var PricesOption;
(function (PricesOption) {
    // global nicehash averages
    PricesOption[PricesOption["Average"] = 0] = "Average";
    // minimum order with workers
    PricesOption[PricesOption["MinimumWithWorkers"] = 1] = "MinimumWithWorkers";
    // minimum order with some amount of accepted speed
    PricesOption[PricesOption["MinimumWithHashrate"] = 2] = "MinimumWithHashrate";
})(PricesOption = exports.PricesOption || (exports.PricesOption = {}));
