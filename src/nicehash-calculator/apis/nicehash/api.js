"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
async function getRawGlobalPrices() {
    const rq = await utils_1.request("https://api.nicehash.com/api?method=stats.global.current");
    const data = JSON.parse(rq.data);
    return data;
}
exports.getRawGlobalPrices = getRawGlobalPrices;
/**
 * Gets the global average prices.
 */
async function getGlobalPrices() {
    const data = await getRawGlobalPrices();
    const cache = [];
    for (const niceHashCost of data.result.stats) {
        cache[niceHashCost.algo] = Number(niceHashCost.price);
    }
    return cache;
}
exports.getGlobalPrices = getGlobalPrices;
/**
 * Returns generic information for buyers
 */
async function getBuyerInfo() {
    const rq = await utils_1.request("https://api.nicehash.com/api?method=buy.info");
    const data = JSON.parse(rq.data);
    return data.result;
}
exports.getBuyerInfo = getBuyerInfo;
/**
 * Gets the existing orders for an algorithm
 *
 * @param algo The algorithm
 */
async function getOrders(algo) {
    const rq = await utils_1.request(`https://api.nicehash.com/api?method=orders.get&algo=${algo.id}`);
    const data = JSON.parse(rq.data);
    return data;
}
exports.getOrders = getOrders;
/**
 * Gets the minimum price to place an order for an algorithm.
 * By default searches for the lowest price order with some accepted speed but can be configured to use workers instead of accepted speed.
 *
 * @param algo The algorithm
 * @param withWorkers If true, find the lowest price order with workers. If false or undefined, uses accepted speed as a comparison instead.
 */
async function getPrice(algo, withWorkers) {
    const data = await getOrders(algo);
    const orders = data.result.orders;
    // find the lowest order with workers
    let minimumOrder = orders[0];
    for (const order of orders) {
        const price = Number(order.price);
        const comparison = withWorkers ? order.workers : order.accepted_speed;
        if (price < Number(minimumOrder.price) && comparison > 0) {
            minimumOrder = order;
        }
    }
    logger_1.logger.debug("NiceHash.getPrice(): returned from web for " + algo.id);
    const minimumPrice = minimumOrder ? Number(minimumOrder.price) : Infinity;
    return minimumPrice;
}
exports.getPrice = getPrice;
