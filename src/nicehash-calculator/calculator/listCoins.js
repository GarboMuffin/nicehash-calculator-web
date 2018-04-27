"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
function listCoins(coins) {
    console.log("Enabled coins:");
    for (const coin of coins) {
        console.log(chalk_1.default ` * ${coin.displayName} (${coin.abbreviation}) {gray (${coin.algorithm.displayName})}`);
    }
}
exports.listCoins = listCoins;
