"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
// Different units of hashrate
class HashRateUnit {
    constructor(hashes, displayName) {
        this.hashes = hashes;
        this.displayName = displayName;
        HashRateUnit.instances.push(this);
    }
    static fromString(str) {
        str = str.toLowerCase();
        for (const algorithm of HashRateUnit.instances) {
            if (algorithm.displayName.toLowerCase() === str) {
                return algorithm;
            }
        }
        logger_1.logger.warn("No hash rate unit named " + str);
        return HashRateUnit.HASH;
    }
}
HashRateUnit.instances = [];
HashRateUnit.HASH = new HashRateUnit(1, "H");
HashRateUnit.KILO = new HashRateUnit(1000, "KH");
HashRateUnit.MEGA = new HashRateUnit(1000 * 1000, "MH");
HashRateUnit.MSOL = new HashRateUnit(1000 * 1000, "MSol");
HashRateUnit.GIGA = new HashRateUnit(1000 * 1000 * 1000, "GH");
HashRateUnit.TERA = new HashRateUnit(1000 * 1000 * 1000 * 1000, "TH");
HashRateUnit.PETA = new HashRateUnit(1000 * 1000 * 1000 * 1000 * 1000, "PH");
exports.HashRateUnit = HashRateUnit;
