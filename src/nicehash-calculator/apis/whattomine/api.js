"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../logger");
const utils_1 = require("../../utils");
async function getRawCoins() {
    const raw = await utils_1.request("https://whattomine.com/coins.json");
    const data = JSON.parse(raw.data);
    return data;
}
exports.getRawCoins = getRawCoins;
async function getRawCalculators() {
    const raw = await utils_1.request("https://whattomine.com/calculators.json");
    const data = JSON.parse(raw.data);
    return data;
}
exports.getRawCalculators = getRawCalculators;
async function getRawRevenue(id, hashrate) {
    // https://whattomine.com/coins/1.json
    const raw = await utils_1.request(`https://whattomine.com/coins/${id}.json?hr=${hashrate}`);
    const data = JSON.parse(raw.data);
    return data;
}
exports.getRawRevenue = getRawRevenue;
async function getRawMassRevenueCache(opts) {
    let url = "http://whattomine.com/coins.json?";
    for (const algo of opts.algos) {
        if (algo.algorithm.cacheNames === null) {
            continue;
        }
        const names = algo.algorithm.cacheNames;
        url += `&${names[0]}=true&factor[${names[1]}_hr]=${algo.hashrate}`;
    }
    const raw = await utils_1.request(url);
    const data = JSON.parse(raw.data);
    return data;
}
exports.getRawMassRevenueCache = getRawMassRevenueCache;
//
// Wrappers
//
// populates the local cache
async function getMassRevenueCache(opts) {
    const data = await getRawMassRevenueCache(opts);
    const result = [];
    for (const key of Object.keys(data.coins)) {
        const value = data.coins[key];
        if (value.lagging) {
            continue;
        }
        if (key.startsWith("Nicehash")) {
            continue;
        }
        result[value.id] = {
            timestamp: value.timestamp * 1000,
            revenue: +value.btc_revenue24,
        };
    }
    return result;
}
exports.getMassRevenueCache = getMassRevenueCache;
// Returns WhatToMine's list of calculators in a more usable format
async function getCalculators() {
    // Get the raw data
    const data = (await getRawCalculators()).coins;
    // Convert to an array
    const coins = [];
    for (const key of Object.keys(data)) {
        const value = data[key];
        const logSkip = (reason) => {
            logger_1.logger.debug(`WhatToMine.getCalculators(): skipping ${key} (${value.id}): ${reason}`);
        };
        // Ignore Nicehash coins
        if (value.tag === "NICEHASH") {
            logSkip("nicehash");
            continue;
        }
        // Remove coins that aren't active (profitability calculating won't work)
        if (value.status !== "Active") {
            logSkip("inactive");
            continue;
        }
        // Set the name property
        value.name = key;
        coins.push(value);
    }
    return coins;
}
exports.getCalculators = getCalculators;
// Returns BTC revenue of mining coin id with hashrate hashrate
async function getRevenue(id, hashrate) {
    logger_1.logger.debug("WhatToMine.getRevenue(): returning from web for " + id);
    const data = await getRawRevenue(id, hashrate);
    const revenue = Number(data.btc_revenue);
    return {
        timestamp: data.timestamp * 1000,
        revenue,
    };
}
exports.getRevenue = getRevenue;
