"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// returns a promise that will resolve after `ms` ms
const rp = require("request-promise-native");
const logger_1 = require("./logger");
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
// returns whether or not a given input is a valid finite number
// typically `thing` is of type string or number
function isNumber(thing) {
    return Number.isFinite(+thing);
}
exports.isNumber = isNumber;
// returns a copy of a list
// javascript is pass by reference on almost all types which can mess things up in some cases
function clone(arr) {
    let i = arr.length;
    const res = [];
    while (i--) {
        res[i] = arr[i];
    }
    return res;
}
exports.clone = clone;
async function request(url) {
    logger_1.logger.debug("request(): requested " + url);
    const rq = await rp(url, {
        headers: {
        // perhaps define a user-agent or referrer?
        },
    });
    return rq;
}
exports.request = request;
