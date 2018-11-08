"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WhatToMine = require("./apis/whattomine");
class Algorithm {
    constructor(opts) {
        this.displayName = opts.name;
        this.names = opts.aliases || [];
        this.names.unshift(this.displayName.toLowerCase());
        this.whatToMine = opts.whatToMine;
        this.id = opts.id;
        Algorithm.instances.push(this);
    }
}
Algorithm.instances = [];
/* tslint:disable:variable-name */
Algorithm.LBRY = new Algorithm({
    name: "LBRY",
    whatToMine: WhatToMine.Algorithm.LBRY,
    id: 23,
});
Algorithm.Ethash = new Algorithm({
    name: "DaggerHashimoto",
    whatToMine: WhatToMine.Algorithm.Ethash,
    id: 20,
});
Algorithm.NeoScrypt = new Algorithm({
    name: "NeoScrypt",
    whatToMine: WhatToMine.Algorithm.NeoScrypt,
    id: 8,
});
Algorithm.Skunkhash = new Algorithm({
    name: "Skunkhash",
    aliases: ["skunk"],
    whatToMine: WhatToMine.Algorithm.Skunkhash,
    id: 29,
});
Algorithm.Equihash = new Algorithm({
    name: "Equihash",
    whatToMine: WhatToMine.Algorithm.Equihash,
    id: 24,
});
Algorithm.CryptoNight = new Algorithm({
    name: "CryptoNight",
    aliases: ["cn"],
    whatToMine: WhatToMine.Algorithm.CryptoNight,
    id: 22,
});
Algorithm.Lyra2REv2 = new Algorithm({
    name: "Lyra2REv2",
    whatToMine: WhatToMine.Algorithm.Lyra2REv2,
    id: 14,
});
Algorithm.Pascal = new Algorithm({
    name: "Pascal",
    whatToMine: WhatToMine.Algorithm.Pascal,
    id: 25,
});
Algorithm.X11Gost = new Algorithm({
    name: "X11Gost",
    whatToMine: WhatToMine.Algorithm.X11Gost,
    id: 26,
});
Algorithm.Keccak = new Algorithm({
    name: "Keccak",
    whatToMine: WhatToMine.Algorithm.Keccak,
    id: 5,
});
Algorithm.X11 = new Algorithm({
    name: "X11",
    whatToMine: WhatToMine.Algorithm.X11,
    id: 3,
});
Algorithm.X13 = new Algorithm({
    name: "X13",
    whatToMine: WhatToMine.Algorithm.X13,
    id: 4,
});
Algorithm.Scrypt = new Algorithm({
    name: "Scrypt",
    whatToMine: WhatToMine.Algorithm.Scrypt,
    id: 0,
});
Algorithm["SHA-256"] = new Algorithm({
    name: "SHA-256",
    whatToMine: WhatToMine.Algorithm["SHA-256"],
    aliases: ["sha256"],
    id: 1,
});
Algorithm.Quark = new Algorithm({
    name: "Quark",
    whatToMine: WhatToMine.Algorithm.Quark,
    id: 12,
});
Algorithm.NIST5 = new Algorithm({
    name: "Nist5",
    whatToMine: WhatToMine.Algorithm.NIST5,
    id: 7,
});
Algorithm.Lyra2RE = new Algorithm({
    name: "Lyra2RE",
    whatToMine: WhatToMine.Algorithm.Lyra2RE,
    id: 9,
});
Algorithm.Qubit = new Algorithm({
    name: "Qubit",
    whatToMine: WhatToMine.Algorithm.Qubit,
    id: 11,
});
Algorithm["Blake (2s)"] = new Algorithm({
    name: "Blake (2s)",
    whatToMine: WhatToMine.Algorithm["Blake (2s)"],
    id: 28,
});
Algorithm["Blake (2b)"] = new Algorithm({
    name: "Sia",
    whatToMine: WhatToMine.Algorithm["Blake (2b)"],
    id: 27,
});
Algorithm["Blake (14r)"] = new Algorithm({
    name: "Decred",
    whatToMine: WhatToMine.Algorithm["Blake (14r)"],
    id: 21,
});
Algorithm.CryptoNightV7 = new Algorithm({
    name: "CryptoNightV7",
    aliases: ["cryptonight7", "cn7"],
    whatToMine: WhatToMine.Algorithm.CryptoNightV7,
    id: 30,
});
Algorithm.CryptoNightHeavy = new Algorithm({
    name: "CryptoNightHeavy",
    whatToMine: WhatToMine.Algorithm.CryptoNightHeavy,
    id: 31,
});
Algorithm.Lyra2z = new Algorithm({
    name: "Lyra2Z",
    whatToMine: WhatToMine.Algorithm.Lyra2z,
    id: 32,
});
Algorithm.X16R = new Algorithm({
    name: "X16R",
    whatToMine: WhatToMine.Algorithm.X16R,
    id: 33,
});
Algorithm.CryptoNightV8 = new Algorithm({
    name: "CryptoNightV8",
    aliases: ["cryptonight8", "cn8"],
    whatToMine: WhatToMine.Algorithm.CryptoNightV8,
    id: 34,
});
exports.Algorithm = Algorithm;
