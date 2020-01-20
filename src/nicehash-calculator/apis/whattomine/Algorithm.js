"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HashRateUnit_1 = require("../../HashRateUnit");
// WhatToMine algorithms
class Algorithm {
    constructor(unit, cacheNames) {
        this.unit = unit;
        if (typeof cacheNames === "string") {
            this.cacheNames = [cacheNames, cacheNames];
        }
        else {
            this.cacheNames = cacheNames;
        }
    }
}
/* tslint:disable:variable-name */
Algorithm.LBRY = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, "lbry");
Algorithm.Ethash = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, "eth");
Algorithm.NeoScrypt = new Algorithm(HashRateUnit_1.HashRateUnit.KILO, "ns");
Algorithm.Equihash = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, "eq");
Algorithm.Lyra2REv2 = new Algorithm(HashRateUnit_1.HashRateUnit.KILO, ["lre", "lrev2"]);
Algorithm.X11Gost = new Algorithm(HashRateUnit_1.HashRateUnit.GIGA, "x11g");
Algorithm.Keccak = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, null);
Algorithm.X11 = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, null);
Algorithm.X13 = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, null);
Algorithm.Scrypt = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, null);
Algorithm["SHA-256"] = new Algorithm(HashRateUnit_1.HashRateUnit.GIGA, null);
Algorithm.Quark = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, null);
Algorithm.NIST5 = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, "ns");
Algorithm.Lyra2RE = new Algorithm(HashRateUnit_1.HashRateUnit.KILO, null);
Algorithm.Qubit = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, null);
Algorithm["Blake (2s)"] = new Algorithm(HashRateUnit_1.HashRateUnit.GIGA, null);
Algorithm["Blake (14r)"] = new Algorithm(HashRateUnit_1.HashRateUnit.GIGA, "bk14");
Algorithm.Lyra2z = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, "l2z");
Algorithm.X16R = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, "x16r");
Algorithm.Zhash = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, "zh");
Algorithm.GrinCuckaroo29 = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, "cr29");
Algorithm.GrinCuckatoo31 = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, null);
Algorithm.Lyra2REv3 = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, "lrev3");
Algorithm.MTP = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, "mtp");
Algorithm.CryptoNightR = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, null);
Algorithm.CuckooCycle = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, "cc");
Algorithm.Cuckaroo29s = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, "cr29");
Algorithm.BeamHashII = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, null);
Algorithm.X16Rv2 = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, null);
Algorithm.Eaglesong = new Algorithm(HashRateUnit_1.HashRateUnit.GIGA, null);
Algorithm.RandomX = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, null);
Algorithm.Cuckaroom29 = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, null);
exports.Algorithm = Algorithm;
