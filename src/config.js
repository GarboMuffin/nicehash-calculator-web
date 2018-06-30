module.exports.PORT = process.env.PORT || 8080;
module.exports.REFRESH_TIME = 1000 * 60 * 60 * 1.5; // prod often uses a different number here
module.exports.IN_PRODUCTION = process.env.NODE_ENV === "production";
module.exports.DISABLED_COINS = [
  // these coins have a history of having a very low ROI

  // sha-256
  "crown",
  "unobtanium",
  "zetacoin",
  // scrypt
  "bata",
  "mooncoin",
  "worldcoin",
  "viacoin",
  "dnotes",
  "einsteinium",
  "florin",
  "heldcoin",
  "dogecoin",
  "linx",
  // x11
  "qbc", // Québecoin, the fancy e seems to break it normally
  "creamcoin",
  "startcoin",
  "influxcoin",
  "adzcoin",
  "pxi",
  // equihash
  "bitcoinz",
  // keccak, pretty much a dead market now so the entire algorithm could be disabled
  "maxcoin",
  "smartcash",
  // neoscrypt
  "crowdcoin",
  "halcyon",
  "phoenixcoin",
  "orbitcoin",
  "dinero",
  "simplebank",
  // cryptonight
  "digitalnote",
  "bytecoin",
  "monerooriginal",
  // lyra2rev2
  "galactrum",
  "rupee",
  "straks",
  // other/multi
  "xmy", // myriad-scrypt and myriad-sha
  "dgc", // scrypt, x11, and sha variants

  // missing exchanges, so temporary
  "btcp", // bitcoin private
  "lcc", // litecoin cash
];
