"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Algorithm_1 = require("../Algorithm");
const WhatToMine = require("../apis/whattomine");
const logger_1 = require("../logger");
function getAlgorithm(algo) {
    const match = Algorithm_1.Algorithm[algo];
    // bail on no match
    if (!match)
        return null;
    // bail on missing metadata
    if (!match.niceHash)
        return null;
    if (!match.whatToMine)
        return null;
    return match;
}
function getAdditionalNames(coin) {
    // Due to the switch to using whattomine to know coins we no longer have control over the data
    // And as a result some "less than good" work is done for this
    // WhatToMine doesn't always provide very good display names so some manual converting is done
    // some additional aliases may also be given
    const coins = {
        BitcoinCash: { displayName: "Bitcoin Cash", names: ["bcash", "bcc"] },
        BitcoinGold: { displayName: "Bitcoin Gold" },
        EthereumClassic: { displayName: "Ethereum Classic" },
        BitcoinPrivate: { displayName: "Bitcoin Private" },
    };
    return coins[coin.displayName] || {};
}
async function getCoins() {
    const whatToMineCalculators = await WhatToMine.getCalculators();
    const coins = [];
    // Convert the coins to our own thing
    for (const whatToMineCalculator of whatToMineCalculators) {
        const coin = {}; // as any tricks typescript into ignoring all the errors
        coin.enabled = null;
        coin.displayName = whatToMineCalculator.name;
        coin.abbreviation = whatToMineCalculator.tag;
        coin.names = [coin.displayName.toLowerCase(), coin.abbreviation.toLowerCase()]; // name and abbreviation
        coin.lagging = whatToMineCalculator.lagging;
        // Additional names/User friendly display names
        const additionalNames = getAdditionalNames(coin);
        if (additionalNames.displayName) {
            coin.displayName = additionalNames.displayName;
            coin.names.push(coin.displayName.toLowerCase());
        }
        if (additionalNames.names) {
            coin.names = coin.names.concat(additionalNames.names);
        }
        coin.id = whatToMineCalculator.id;
        // set algo
        const algorithm = getAlgorithm(whatToMineCalculator.algorithm);
        if (algorithm === null) {
            // This coin doesn't have a matching algorithm on nicehash so don't add it
            logger_1.logger.debug(`getCoins(): unknown algo: ${whatToMineCalculator.algorithm} (${whatToMineCalculator.name})`);
            continue;
        }
        coin.algorithm = algorithm;
        coins.push(coin);
    }
    // Sort the coins, low ids first (Bitcoin, Litecoin, etc.)
    coins.sort((a, b) => a.id - b.id);
    return coins;
}
exports.getCoins = getCoins;
