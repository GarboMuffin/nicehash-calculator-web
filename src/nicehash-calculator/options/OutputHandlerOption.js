"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("../handlers");
const DelayedJSONHandler_1 = require("../handlers/DelayedJSONHandler");
// Support handlers
class OutputHandlerOption {
    constructor(clazz) {
        this.class = clazz;
    }
}
/* tslint:disable:variable-name */
// The normal handler, "unified" or "pretty"
OutputHandlerOption.Pretty = new OutputHandlerOption(handlers_1.UnifiedHandler);
// Outputs formatted JSON, can be parsed by anything
// Best used with --no-header
OutputHandlerOption.JSON = new OutputHandlerOption(handlers_1.JSONHandler);
// Like JSONHandler but logs once at the end
OutputHandlerOption.DelayedJSON = new OutputHandlerOption(DelayedJSONHandler_1.DelayedJSONHandler);
exports.OutputHandlerOption = OutputHandlerOption;
