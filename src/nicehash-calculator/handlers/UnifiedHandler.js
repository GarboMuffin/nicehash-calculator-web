"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const AbstractHandler_1 = require("./AbstractHandler");
const PRECISION = 4;
function fancyFormatNumber(num) {
    const isPositive = num > 0;
    const asString = (isPositive ? "+" : "") + num.toFixed(PRECISION);
    const color = isPositive ? chalk_1.default.green : chalk_1.default.red;
    return color(asString);
}
class UnifiedHandler extends AbstractHandler_1.AbstractHandler {
    handle(data, calculator) {
        // the unit of hashrate
        const hashRateUnit = data.coin.algorithm.niceHash.unit.displayName;
        let indent = 0;
        const log = (message) => {
            const spacing = " ".repeat(indent);
            const messageToPrint = spacing + message;
            console.log(messageToPrint);
        };
        const printTitle = () => {
            // output coin name & algo
            const algo = data.coin.algorithm.displayName;
            let message = data.coin.displayName;
            message += chalk_1.default.gray(` (${algo})`);
            if (data.coin.lagging) {
                message += chalk_1.default.yellow(" (Lagging)");
            }
            log(message);
        };
        const printPrice = () => {
            const price = data.price.toFixed(PRECISION);
            log(chalk_1.default `Price:   {underline ${price}} BTC/${hashRateUnit}/day`);
        };
        const printRevenue = () => {
            const revenue = data.revenue.toFixed(PRECISION);
            const time = (new Date(data.rawRevenue.timestamp)).toLocaleString();
            log(chalk_1.default `Revenue: {underline ${revenue}} BTC/${hashRateUnit}/day {gray (${time})}`);
        };
        const printProfit = () => {
            const profit = fancyFormatNumber(data.profit);
            const percentChange = fancyFormatNumber(data.percentChange * 100);
            log(chalk_1.default `Profit: {underline ${profit}} BTC/${hashRateUnit}/day (${percentChange}%)`);
        };
        const printWarnings = () => {
            // price of 0 means that there are no orders on nicehash
            if (data.price === 0) {
                log(chalk_1.default.red("Warning: NO ORDERS!"));
            }
            // profit of more than 1000% typically means some api unit has changed
            if (data.returnOnInvestment > 10) {
                log(chalk_1.default.yellow("Warning: Profit seems incredibly high, perhaps an API unit has changed?"));
            }
        };
        printTitle();
        indent++;
        printPrice();
        printRevenue();
        printProfit();
        printWarnings();
        console.log("");
    }
}
exports.UnifiedHandler = UnifiedHandler;
