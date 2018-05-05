"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractHandler_1 = require("./AbstractHandler");
// Enabled with --output=json
// Allows access to just get the raw data and it's what you would use to read data from
// this program to use with another
class JSONHandler extends AbstractHandler_1.AbstractHandler {
    constructor() {
        super(...arguments);
        this.pretty = false;
    }
    handle(data) {
        // really advanced
        console.log(JSON.stringify(data));
    }
}
exports.JSONHandler = JSONHandler;
