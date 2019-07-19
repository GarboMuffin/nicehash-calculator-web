"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const Algorithm_1 = require("../Algorithm");
const HashRateUnit_1 = require("../HashRateUnit");
const NiceHash = require("../apis/nicehash");
const WhatToMine = require("../apis/whattomine");
const requestLib = require("../lib/request");
const logger_1 = require("../logger");
const utils_1 = require("../utils");
const coins_1 = require("./coins");
const filter_1 = require("./filter");
const listCoins_1 = require("./listCoins");
class NiceHashCalculator {
    constructor(options = {}) {
        this.revenueCache = [];
        this.priceCache = {};
        this.options = options;
        // everything else happens in start()
        // constructing a NiceHashCalculator should be possible without side effects so that testing can be done
    }
    //
    // Core
    //
    async start() {
        // determine the output handler to be used
        const outputHandler = new this.options.outputHandler.class();
        this.outputHandler = outputHandler;
        this.initOptions();
        await this.initApis();
        // get all coins on whattomine
        const allCoins = await coins_1.getCoins();
        // read the coins the user specified and get them
        const coins = filter_1.filter(allCoins, this.options.coins);
        // if --list-coins is used then just print coins enabled rather than profit data
        if (this.options.listCoins) {
            listCoins_1.listCoins(coins);
            return;
        }
        await this.populateWhatToMineCache(coins);
        // For every coin...
        for (const coin of coins) {
            // get the data
            const data = await this.handleCoin(coin);
            // pass it onto the handler
            outputHandler.handle(data, this);
            // wait before going onto the next coin unless this is the last coin
            const isLastCoin = coins.indexOf(coin) === coins.length - 1;
            if (!isLastCoin) {
                await utils_1.sleep(this.options.sleepTime);
            }
        }
        // tell the output handler that everything has finished
        // nothing uses this yet but it may be used in the future
        // (eg. "summarizing" results)
        outputHandler.finished(this);
    }
    // given a coin it will return the data structure that is then passed onto handlers
    async handleCoin(coin) {
        // estimate revenue from whattomine
        const revenueData = await this.getRevenue(coin);
        // optionally account for 3% fee on nicehash
        if (this.options.includeFees) {
            revenueData.revenue *= 0.97;
        }
        const revenue = revenueData.revenue;
        // get the price from nicehash
        const price = await this.getPrice(coin.algorithm.niceHash);
        const profit = revenue - price;
        // if the price is 0 (no orders) then ROI should also be 0
        const returnOnInvestment = price === 0 ? 0 : revenue / price;
        const percentChange = returnOnInvestment - 1;
        // create the data structure
        const data = {
            coin,
            revenue,
            rawRevenue: revenueData,
            price,
            profit,
            returnOnInvestment,
            percentChange,
        };
        return data;
    }
    //
    // Init
    //
    initOptions() {
        logger_1.logger.showWarnings = this.options.showWarnings;
        logger_1.logger.debugEnabled = this.options.debug;
        logger_1.logger.debug("options", this.options);
        // set the pretty print option of the request lib
        requestLib.config.pretty.enabled = this.outputHandler.pretty;
        // For each unrecognized option log a warning to the user
        for (const unrecognizedOption of this.options.unrecognized) {
            logger_1.logger.warn("Unrecognized option: " + unrecognizedOption);
        }
        // Conditionally output a header
        if (this.options.showHeader) {
            this.printHeader();
        }
        // --experimental-fees: attempt to include fees
        if (this.options.includeFees) {
            logger_1.logger.warn("Accounting for NiceHash's 3% fee. This is experimental. Please be aware of the additional 0.0001 BTC fee that is not accounted for here.");
        }
    }
    printHeader() {
        console.log(chalk_1.default `NiceHash is not affiliated with this project. {bold I am not responsible for any losses.}`);
        console.log('');
    }
    async initApis() {
        // Temporarily disabled until the API provides something actually equal to the old one.
        // if (this.options.prices === PricesOption.Average) {
        //   this.priceCache = await NiceHash.getGlobalPrices();
        // }
        // set some algorithm metadata
        const buyerInfo = await NiceHash.getBuyerInfo();
        const algorithms = buyerInfo.miningAlgorithms;
        for (const nhMeta of algorithms) {
            const hashrate = nhMeta.speed_text;
            const id = +nhMeta.algo;
            for (const algo of Algorithm_1.Algorithm.instances) {
                if (algo.idNum === id) {
                    const algorithm = new NiceHash.Algorithm(algo.idEnum, HashRateUnit_1.HashRateUnit.fromString(hashrate));
                    algo.niceHash = algorithm;
                    logger_1.logger.debug(`initApis(): set unit for ${algo.displayName} to ${algorithm.unit.displayName}`);
                    break;
                }
            }
        }
        // error checking
        if (logger_1.logger.debugEnabled) {
            for (const algo of Algorithm_1.Algorithm.instances) {
                if (!algo.niceHash) {
                    logger_1.logger.warn(`Missing metadata for algorithm ${algo.displayName} (${algo.idEnum})`);
                }
            }
        }
    }
    async populateWhatToMineCache(coins) {
        const activeAlgorithms = new Set(coins.map((coin) => coin.algorithm));
        const getOptions = () => {
            const result = [];
            for (const algo of activeAlgorithms) {
                if (!algo.whatToMine.cacheNames) {
                    continue;
                }
                result.push({
                    algorithm: algo.whatToMine,
                    hashrate: this.getWhatToMineHashrate(algo),
                });
            }
            return result;
        };
        const algos = getOptions();
        // if no algorithms will benefit then don't waste time
        if (algos.length === 0) {
            return;
        }
        const cache = await WhatToMine.getListedCoins(algos);
        this.revenueCache = cache;
    }
    //
    // Utility
    //
    getWhatToMineHashrate(algorithm) {
        return algorithm.niceHash.unit.hashes / algorithm.whatToMine.unit.hashes;
    }
    async getPrice(algo) {
        if (this.priceCache[algo.id] !== undefined) {
            return this.priceCache[algo.id];
        }
        else {
            const price = await NiceHash.getPrice(algo, this.options.prices);
            this.priceCache[algo.id] = price;
            return price;
        }
    }
    async getRevenue(coin) {
        if (this.revenueCache[coin.id]) {
            return this.revenueCache[coin.id];
        }
        else {
            return await WhatToMine.getRevenue(coin.id, this.getWhatToMineHashrate(coin.algorithm));
        }
    }
}
exports.NiceHashCalculator = NiceHashCalculator;
