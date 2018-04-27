"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
class Logger {
    constructor() {
        this.debugEnabled = false;
        this.showWarnings = true;
    }
    // logs warning text
    warn(...args) {
        if (this.showWarnings) {
            args.unshift("Warning:");
            args = args.map((str) => chalk_1.default.yellow(str));
            console.warn.apply(console, args);
        }
    }
    // logs debug text, only if debug is enabled
    debug(...args) {
        if (this.debugEnabled) {
            args.unshift(chalk_1.default.gray("debug"));
            console.log.apply(console, args);
        }
    }
}
exports.logger = new Logger();
