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
Algorithm.Skunkhash = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, "skh");
Algorithm.Equihash = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, "eq");
Algorithm.CryptoNight = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, "cn");
Algorithm.Lyra2REv2 = new Algorithm(HashRateUnit_1.HashRateUnit.KILO, ["lre", "lrev2"]);
Algorithm.Pascal = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, "pas");
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
Algorithm["Blake (2s)"] = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, null);
Algorithm["Blake (2b)"] = new Algorithm(HashRateUnit_1.HashRateUnit.GIGA, null);
Algorithm["Blake (14r)"] = new Algorithm(HashRateUnit_1.HashRateUnit.MEGA, "bk14");
Algorithm.CryptoNightV7 = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, "cn7");
Algorithm.CryptoNightHeavy = new Algorithm(HashRateUnit_1.HashRateUnit.HASH, null);
Algorithm.Lyra2z = new Algorithm(HashRateUnit_1.HashRateUnit.KILO, null);
exports.Algorithm = Algorithm;
