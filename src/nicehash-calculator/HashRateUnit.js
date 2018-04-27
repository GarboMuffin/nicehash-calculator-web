"use strict";
// Different units of hashrate
Object.defineProperty(exports, "__esModule", { value: true });
class HashRateUnit {
    constructor(hashes, displayName) {
        this.hashes = hashes;
        this.displayName = displayName;
    }
}
HashRateUnit.HASH = new HashRateUnit(1, "H");
HashRateUnit.KILO = new HashRateUnit(1000, "KH");
HashRateUnit.MEGA = new HashRateUnit(1000 * 1000, "MH");
HashRateUnit.MSOL = new HashRateUnit(1000 * 1000, "MSol");
HashRateUnit.GIGA = new HashRateUnit(1000 * 1000 * 1000, "GH");
HashRateUnit.TERA = new HashRateUnit(1000 * 1000 * 1000 * 1000, "TH");
HashRateUnit.PETA = new HashRateUnit(1000 * 1000 * 1000 * 1000 * 1000, "PH");
exports.HashRateUnit = HashRateUnit;
