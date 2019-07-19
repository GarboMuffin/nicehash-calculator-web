"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OptionParser = require(".");
const OptionLib = require("../lib/options");
const optionToObject_1 = require("./optionToObject");
function parseOptions(args) {
    const parsedOptions = OptionLib.parse(args, {
        arguments: {
            /* tslint:disable:object-literal-key-quotes */
            // used by chalk
            "no-color": {
                type: "boolean",
                default: false,
            },
            "debug": {
                type: "boolean",
                default: false,
                aliases: ["verbose"],
            },
            "no-header": {
                type: "boolean",
                default: false,
            },
            "no-warnings": {
                type: "boolean",
                default: false,
            },
            "output": {
                type: "string",
                default: "pretty",
            },
            "prices": {
                type: "string",
                default: "average",
            },
            "sleep-time": {
                type: "number",
                default: 1000,
            },
            "experimental-fees": {
                type: "boolean",
                default: false,
            },
            "list-coins": {
                type: "boolean",
                default: false,
            },
        },
    });
    const options = {
        unrecognized: parsedOptions.unrecognized,
        coins: parsedOptions.plain,
        debug: parsedOptions.arguments.debug,
        showHeader: !parsedOptions.arguments["no-header"],
        showWarnings: !parsedOptions.arguments["no-warnings"],
        sleepTime: parsedOptions.arguments["sleep-time"],
        prices: optionToObject_1.optionToObject(parsedOptions, {
            name: "prices",
            default: OptionParser.PricesOption.Average,
            args: {
                average: OptionParser.PricesOption.Average,
                minimum: OptionParser.PricesOption.MinimumWithMiners,
                "minimum-with-speed": OptionParser.PricesOption.MinimumWithHashrate,
            },
        }),
        outputHandler: optionToObject_1.optionToObject(parsedOptions, {
            name: "output",
            default: OptionParser.OutputHandlerOption.Pretty,
            args: {
                pretty: OptionParser.OutputHandlerOption.Pretty,
                json: OptionParser.OutputHandlerOption.JSON,
                "delayed-json": OptionParser.OutputHandlerOption.DelayedJSON,
            },
        }),
        includeFees: parsedOptions.arguments["experimental-fees"],
        listCoins: parsedOptions.arguments["list-coins"],
    };
    return options;
}
exports.parseOptions = parseOptions;
