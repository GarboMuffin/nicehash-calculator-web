"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WhatToMine = require("./apis/whattomine");
class Algorithm {
    constructor(opts) {
        this.displayName = opts.name;
        this.names = opts.aliases || [];
        this.names.unshift(this.displayName.toLowerCase());
        this.whatToMine = opts.whatToMine;
        this.idEnum = opts.idEnum;
        this.idNum = opts.idNum;
        Algorithm.instances.push(this);
    }
}
Algorithm.instances = [];
/* tslint:disable:variable-name */
Algorithm.LBRY = new Algorithm({
    name: "LBRY",
    whatToMine: WhatToMine.Algorithm.LBRY,
    idEnum: "LBRY",
    idNum: 23,
});
Algorithm.Ethash = new Algorithm({
    name: "DaggerHashimoto",
    whatToMine: WhatToMine.Algorithm.Ethash,
    idEnum: "DAGGERHASHIMOTO",
    idNum: 20,
});
Algorithm.NeoScrypt = new Algorithm({
    name: "NeoScrypt",
    whatToMine: WhatToMine.Algorithm.NeoScrypt,
    idEnum: "NEOSCRYPT",
    idNum: 8,
});
Algorithm.Skunkhash = new Algorithm({
    name: "Skunkhash",
    aliases: ["skunk"],
    whatToMine: WhatToMine.Algorithm.Skunkhash,
    idEnum: "SHUNKHASH",
    idNum: 29,
});
Algorithm.Equihash = new Algorithm({
    name: "Equihash",
    whatToMine: WhatToMine.Algorithm.Equihash,
    idEnum: "EQUIHASH",
    idNum: 24,
});
Algorithm.CryptoNight = new Algorithm({
    name: "CryptoNight",
    aliases: ["cn"],
    whatToMine: WhatToMine.Algorithm.CryptoNight,
    idEnum: "CRYPTONIGHT",
    idNum: 22,
});
Algorithm.Lyra2REv2 = new Algorithm({
    name: "Lyra2REv2",
    whatToMine: WhatToMine.Algorithm.Lyra2REv2,
    idEnum: "LYRA2REV2",
    idNum: 14,
    aliases: ["lrev2"],
});
Algorithm.Pascal = new Algorithm({
    name: "Pascal",
    whatToMine: WhatToMine.Algorithm.Pascal,
    idEnum: "PASCAL",
    idNum: 25,
});
Algorithm.Keccak = new Algorithm({
    name: "Keccak",
    whatToMine: WhatToMine.Algorithm.Keccak,
    idEnum: "KECCAK",
    idNum: 5,
});
Algorithm.X11 = new Algorithm({
    name: "X11",
    whatToMine: WhatToMine.Algorithm.X11,
    idEnum: "X11",
    idNum: 3,
});
Algorithm.X13 = new Algorithm({
    name: "X13",
    whatToMine: WhatToMine.Algorithm.X13,
    idEnum: "X13",
    idNum: 4,
});
Algorithm.Scrypt = new Algorithm({
    name: "Scrypt",
    whatToMine: WhatToMine.Algorithm.Scrypt,
    idEnum: "SCRYPT",
    idNum: 0,
});
Algorithm["SHA-256"] = new Algorithm({
    name: "SHA-256",
    whatToMine: WhatToMine.Algorithm["SHA-256"],
    aliases: ["sha256"],
    idEnum: "SHA256",
    idNum: 1,
});
Algorithm.Quark = new Algorithm({
    name: "Quark",
    whatToMine: WhatToMine.Algorithm.Quark,
    idEnum: "QUARK",
    idNum: 12,
});
Algorithm.NIST5 = new Algorithm({
    name: "Nist5",
    whatToMine: WhatToMine.Algorithm.NIST5,
    idEnum: "NIST5",
    idNum: 7,
});
Algorithm.Qubit = new Algorithm({
    name: "Qubit",
    whatToMine: WhatToMine.Algorithm.Qubit,
    idEnum: "QUBIT",
    idNum: 11,
});
Algorithm["Blake (2s)"] = new Algorithm({
    name: "Blake (2s)",
    whatToMine: WhatToMine.Algorithm["Blake (2s)"],
    idEnum: "BLAKE2S",
    idNum: 28,
});
Algorithm.Sia = new Algorithm({
    name: "Sia",
    whatToMine: WhatToMine.Algorithm.Sia,
    idEnum: "SIA",
    idNum: 27,
});
Algorithm["Blake (14r)"] = new Algorithm({
    name: "Decred",
    whatToMine: WhatToMine.Algorithm["Blake (14r)"],
    idEnum: "DECRED",
    idNum: 21,
});
Algorithm.CryptoNightV7 = new Algorithm({
    name: "CryptoNightV7",
    aliases: ["cryptonight7", "cn7"],
    whatToMine: WhatToMine.Algorithm.CryptoNightV7,
    idEnum: "CRYPTONIGHTV7",
    idNum: 30,
});
Algorithm.CryptoNightHeavy = new Algorithm({
    name: "CryptoNightHeavy",
    whatToMine: WhatToMine.Algorithm.CryptoNightHeavy,
    idEnum: "CRYPTONIGHTHEAVY",
    idNum: 31,
});
Algorithm.Lyra2z = new Algorithm({
    name: "Lyra2Z",
    whatToMine: WhatToMine.Algorithm.Lyra2z,
    idEnum: "LYRA2Z",
    idNum: 32,
});
Algorithm.X16R = new Algorithm({
    name: "X16R",
    whatToMine: WhatToMine.Algorithm.X16R,
    idEnum: "X16R",
    idNum: 33,
});
Algorithm.CryptoNightV8 = new Algorithm({
    name: "CryptoNightV8",
    aliases: ["cryptonight8", "cn8"],
    whatToMine: WhatToMine.Algorithm.CryptoNightV8,
    idEnum: "CRYPTONIGHTV8",
    idNum: 34,
});
Algorithm.Zhash = new Algorithm({
    name: "Zhash",
    whatToMine: WhatToMine.Algorithm.Zhash,
    idEnum: "ZHASH",
    idNum: 36,
});
Algorithm["Equihash (150,5)"] = new Algorithm({
    name: "Beam",
    whatToMine: WhatToMine.Algorithm.Beam,
    idEnum: "BEAM",
    idNum: 37,
});
Algorithm.Cuckaroo29 = new Algorithm({
    name: "GrinCuckaroo29",
    whatToMine: WhatToMine.Algorithm.GrinCuckaroo29,
    idEnum: "GRINCUCKAROO29",
    idNum: 38,
    aliases: ["gc29"],
});
Algorithm.Cuckatoo31 = new Algorithm({
    name: "GrinCuckatoo31",
    whatToMine: WhatToMine.Algorithm.GrinCuckatoo31,
    idEnum: "GRINCUCKATOO31",
    idNum: 39,
    aliases: ["ct31"],
});
Algorithm.Lyra2REv3 = new Algorithm({
    name: "Lyra2REv3",
    whatToMine: WhatToMine.Algorithm.Lyra2REv3,
    idEnum: "LYRA2REV3",
    idNum: 40,
    aliases: ["lrev3"],
});
Algorithm.CryptoNightR = new Algorithm({
    name: "CryptoNightR",
    whatToMine: WhatToMine.Algorithm.CryptoNightR,
    idEnum: "CRYPTONIGHTR",
    idNum: 42,
});
Algorithm.CuckooCycle = new Algorithm({
    name: "CuckooCycle",
    whatToMine: WhatToMine.Algorithm.CuckooCycle,
    idEnum: "CUCKOOCYCLE",
    idNum: 43,
});
exports.Algorithm = Algorithm;
