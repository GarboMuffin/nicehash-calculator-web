"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractHandler_1 = require("./AbstractHandler");
// Enabled with --output=delayed-json, like JSONHandler
// Takes the raw data, but instead of logging each entry
// it will log an array once at the end
class DelayedJSONHandler extends AbstractHandler_1.AbstractHandler {
    constructor() {
        super(...arguments);
        this.pretty = false;
        this.data = [];
    }
    handle(data) {
        // really advanced
        this.data.push(data);
    }
    finished() {
        console.log(JSON.stringify(this.data));
    }
}
exports.DelayedJSONHandler = DelayedJSONHandler;
