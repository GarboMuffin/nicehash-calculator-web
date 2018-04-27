"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HashRateUnit_1 = require("../../HashRateUnit");
class Algorithm {
    constructor(id, hashRateUnit) {
        this.id = id;
        this.unit = hashRateUnit;
    }
}
/* tslint:disable:variable-name */
Algorithm.Scrypt = new Algorithm(0, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.SHA256 = new Algorithm(1, HashRateUnit_1.HashRateUnit.PETA);
Algorithm.ScryptNf = new Algorithm(2, HashRateUnit_1.HashRateUnit.GIGA);
Algorithm.X11 = new Algorithm(3, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.X13 = new Algorithm(4, HashRateUnit_1.HashRateUnit.GIGA);
Algorithm.Keccak = new Algorithm(5, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.X15 = new Algorithm(6, HashRateUnit_1.HashRateUnit.GIGA);
Algorithm.Nist5 = new Algorithm(7, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.NeoScrypt = new Algorithm(8, HashRateUnit_1.HashRateUnit.GIGA);
Algorithm.Lyra2RE = new Algorithm(9, HashRateUnit_1.HashRateUnit.GIGA);
Algorithm.WhirlpoolX = new Algorithm(10, HashRateUnit_1.HashRateUnit.GIGA);
Algorithm.Qubit = new Algorithm(11, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.Quark = new Algorithm(12, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.Axiom = new Algorithm(13, HashRateUnit_1.HashRateUnit.KILO);
Algorithm.Lyra2REv2 = new Algorithm(14, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.ScryptJaneNf16 = new Algorithm(15, HashRateUnit_1.HashRateUnit.MEGA);
Algorithm.Blake256r8 = new Algorithm(16, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.Blake256r14 = new Algorithm(17, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.Blake256r8vnl = new Algorithm(18, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.Hodl = new Algorithm(19, HashRateUnit_1.HashRateUnit.KILO);
Algorithm.DaggerHashimoto = new Algorithm(20, HashRateUnit_1.HashRateUnit.GIGA);
Algorithm.Decred = new Algorithm(21, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.CryptoNight = new Algorithm(22, HashRateUnit_1.HashRateUnit.MEGA);
Algorithm.Lbry = new Algorithm(23, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.Equihash = new Algorithm(24, HashRateUnit_1.HashRateUnit.MSOL);
Algorithm.Pascal = new Algorithm(25, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.X11Gost = new Algorithm(26, HashRateUnit_1.HashRateUnit.GIGA);
Algorithm.Sia = new Algorithm(27, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.Blake2s = new Algorithm(28, HashRateUnit_1.HashRateUnit.TERA);
Algorithm.Skunk = new Algorithm(29, HashRateUnit_1.HashRateUnit.GIGA);
Algorithm.CryptoNightV7 = new Algorithm(30, HashRateUnit_1.HashRateUnit.MEGA);
exports.Algorithm = Algorithm;
