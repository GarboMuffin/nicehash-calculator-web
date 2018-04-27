"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NiceHash = require("./apis/nicehash");
const WhatToMine = require("./apis/whattomine");
class Algorithm {
    constructor(opts) {
        this.displayName = opts.name;
        this.names = opts.aliases || [];
        this.names.unshift(this.displayName.toLowerCase());
        this.whatToMine = opts.whatToMine;
        this.niceHash = opts.niceHash;
    }
}
/* tslint:disable:variable-name */
Algorithm.LBRY = new Algorithm({
    name: "LBRY",
    whatToMine: WhatToMine.Algorithm.LBRY,
    niceHash: NiceHash.Algorithm.Lbry,
});
Algorithm.Ethash = new Algorithm({
    name: "DaggerHashimoto",
    whatToMine: WhatToMine.Algorithm.Ethash,
    niceHash: NiceHash.Algorithm.DaggerHashimoto,
});
Algorithm.NeoScrypt = new Algorithm({
    name: "NeoScrypt",
    whatToMine: WhatToMine.Algorithm.NeoScrypt,
    niceHash: NiceHash.Algorithm.NeoScrypt,
});
Algorithm.Skunkhash = new Algorithm({
    name: "Skunkhash",
    aliases: ["skunk"],
    whatToMine: WhatToMine.Algorithm.Skunkhash,
    niceHash: NiceHash.Algorithm.Skunk,
});
Algorithm.Equihash = new Algorithm({
    name: "Equihash",
    whatToMine: WhatToMine.Algorithm.Equihash,
    niceHash: NiceHash.Algorithm.Equihash,
});
Algorithm.CryptoNight = new Algorithm({
    name: "CryptoNight",
    aliases: ["cn"],
    whatToMine: WhatToMine.Algorithm.CryptoNight,
    niceHash: NiceHash.Algorithm.CryptoNight,
});
Algorithm.Lyra2REv2 = new Algorithm({
    name: "Lyra2REv2",
    whatToMine: WhatToMine.Algorithm.Lyra2REv2,
    niceHash: NiceHash.Algorithm.Lyra2REv2,
});
Algorithm.Pascal = new Algorithm({
    name: "Pascal",
    whatToMine: WhatToMine.Algorithm.Pascal,
    niceHash: NiceHash.Algorithm.Pascal,
});
Algorithm.X11Gost = new Algorithm({
    name: "X11Gost",
    whatToMine: WhatToMine.Algorithm.X11Gost,
    niceHash: NiceHash.Algorithm.X11Gost,
});
Algorithm.Keccak = new Algorithm({
    name: "Keccak",
    whatToMine: WhatToMine.Algorithm.Keccak,
    niceHash: NiceHash.Algorithm.Keccak,
});
Algorithm.X11 = new Algorithm({
    name: "X11",
    whatToMine: WhatToMine.Algorithm.X11,
    niceHash: NiceHash.Algorithm.X11,
});
Algorithm.X13 = new Algorithm({
    name: "X13",
    whatToMine: WhatToMine.Algorithm.X13,
    niceHash: NiceHash.Algorithm.X13,
});
Algorithm.Scrypt = new Algorithm({
    name: "Scrypt",
    whatToMine: WhatToMine.Algorithm.Scrypt,
    niceHash: NiceHash.Algorithm.Scrypt,
});
Algorithm["SHA-256"] = new Algorithm({
    name: "SHA-256",
    whatToMine: WhatToMine.Algorithm["SHA-256"],
    niceHash: NiceHash.Algorithm.SHA256,
});
Algorithm.Quark = new Algorithm({
    name: "Quark",
    whatToMine: WhatToMine.Algorithm.Quark,
    niceHash: NiceHash.Algorithm.Quark,
});
Algorithm.NIST5 = new Algorithm({
    name: "Nist5",
    whatToMine: WhatToMine.Algorithm.NIST5,
    niceHash: NiceHash.Algorithm.Nist5,
});
Algorithm.Lyra2RE = new Algorithm({
    name: "Lyra2RE",
    whatToMine: WhatToMine.Algorithm.Lyra2RE,
    niceHash: NiceHash.Algorithm.Lyra2RE,
});
Algorithm.Qubit = new Algorithm({
    name: "Qubit",
    whatToMine: WhatToMine.Algorithm.Qubit,
    niceHash: NiceHash.Algorithm.Qubit,
});
Algorithm["Blake (2s)"] = new Algorithm({
    name: "Blake (2s)",
    whatToMine: WhatToMine.Algorithm["Blake (2s)"],
    niceHash: NiceHash.Algorithm.Blake2s,
});
Algorithm["Blake (2b)"] = new Algorithm({
    name: "Sia",
    whatToMine: WhatToMine.Algorithm["Blake (2b)"],
    niceHash: NiceHash.Algorithm.Sia,
});
Algorithm["Blake (14r)"] = new Algorithm({
    name: "Decred",
    whatToMine: WhatToMine.Algorithm["Blake (14r)"],
    niceHash: NiceHash.Algorithm.Decred,
});
Algorithm.CryptoNightV7 = new Algorithm({
    name: "CryptoNightV7",
    aliases: ["cryptonight7", "cn7"],
    whatToMine: WhatToMine.Algorithm.CryptoNightV7,
    niceHash: NiceHash.Algorithm.CryptoNightV7,
});
exports.Algorithm = Algorithm;
