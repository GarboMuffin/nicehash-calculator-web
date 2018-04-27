"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const logger_1 = require("../../logger");
async function getRawGlobalPrices() {
    const rq = await request("https://api.nicehash.com/api?method=stats.global.current");
    const data = JSON.parse(rq);
    return data;
}
exports.getRawGlobalPrices = getRawGlobalPrices;
async function cacheGlobalPrices() {
    const data = await getRawGlobalPrices();
    const cache = [];
    for (const niceHashCost of data.result.stats) {
        cache[niceHashCost.algo] = Number(niceHashCost.price);
    }
    return cache;
}
exports.cacheGlobalPrices = cacheGlobalPrices;
// Returns the existing orders for an algorithm on NiceHash
async function getOrders(algo) {
    const rq = await request(`https://api.nicehash.com/api?method=orders.get&algo=${algo.id}`);
    const data = JSON.parse(rq);
    return data;
}
exports.getOrders = getOrders;
// withWorkers - find minimum with workers OR find minimum with some hashrate, only applies if cache is not populated
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
