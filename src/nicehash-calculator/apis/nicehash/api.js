"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
const Algorithm_1 = require("../../Algorithm");
const options_1 = require("../../options");
async function getRawGlobalPrices() {
    const rq = await utils_1.request("https://api2.nicehash.com/main/api/v2/public/stats/global/current/");
    const data = JSON.parse(rq.data);
    return data;
}
exports.getRawGlobalPrices = getRawGlobalPrices;
/**
 * Gets the global average prices.
 */
async function getGlobalPrices() {
    const data = await getRawGlobalPrices();
    const cache = {};
    const algoMap = [];
    for (const algorithm of Algorithm_1.Algorithm.instances) {
        algoMap[algorithm.idNum] = algorithm;
    }
    for (const i of data.algos) {
        const algorithm = algoMap[i.a];
        if (!algorithm) {
            continue;
        }
        // TODO: This is very broken.
        // The API does not return unit adjusted units, or something.
        // I don't know, or care really.
        cache[algorithm.idEnum] = i.p;
    }
    return cache;
}
exports.getGlobalPrices = getGlobalPrices;
/**
 * Returns generic information for buyers
 */
async function getBuyerInfo() {
    const rq = await utils_1.request("https://api2.nicehash.com/main/api/v2/public/buy/info/");
    const data = JSON.parse(rq.data);
    return data;
}
exports.getBuyerInfo = getBuyerInfo;
/**
 * Gets the existing orders for an algorithm
 *
 * @param algo The algorithm
 */
async function getOrders(algo) {
    const rq = await utils_1.request(`https://api2.nicehash.com/main/api/v2/hashpower/orderBook/?algorithm=${algo.id}`);
    const data = JSON.parse(rq.data);
    return data;
}
exports.getOrders = getOrders;
/**
 * Gets the minimum price to place an order for an algorithm.
 * By default searches for the lowest price order with some accepted speed but can be configured to use miners instead of accepted speed.
 */
async function getPrice(algo, type) {
    const data = await getOrders(algo);
    const stats = data.stats;
    const orders = stats.EU.orders.concat(stats.USA.orders);
    logger_1.logger.debug("NiceHash.getPrice(): returning from web for " + algo.id + " (type=" + type + ")");
    if (type === options_1.PricesOption.Average) {
        let totalPrice = 0;
        let totalHash = 0;
        for (const order of orders) {
            totalPrice += +order.price * +order.acceptedSpeed;
            totalHash += +order.acceptedSpeed;
        }
        return totalPrice / totalHash;
    }
    else {
        let minimumOrder = orders[0];
        for (const order of orders) {
            const price = Number(order.price);
            const comparison = type === options_1.PricesOption.MinimumWithMiners ? order.rigsCount : order.acceptedSpeed;
            if (price < Number(minimumOrder.price) && comparison > 0) {
                minimumOrder = order;
            }
        }
        const minimumPrice = minimumOrder ? Number(minimumOrder.price) : Infinity;
        return minimumPrice;
    }
}
exports.getPrice = getPrice;
