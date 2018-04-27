"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const NiceHashCalculator_1 = require("./calculator/NiceHashCalculator");
const constants_1 = require("./constants");
const OptionParser = require("./options");
async function start() {
    const options = OptionParser.parseOptions(OptionParser.getArguments());
    const calculator = new NiceHashCalculator_1.NiceHashCalculator(options);
    await calculator.start();
}
(async () => {
    // Provides better and more useful error messages than node normally does with promises
    try {
        await start();
    }
    catch (e) {
        console.error(chalk_1.default `{red {bgYellow !!!} FATAL ERROR {bgYellow !!!}}`);
        console.error(chalk_1.default.red("This is a bug, please report it: " + constants_1.BUG_REPORT_URL));
        console.error(chalk_1.default.red("Please include the stack trace below:"));
        console.error(e.stack);
    }
})();
