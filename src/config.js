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
  "aur-scrypt",
  "bata",
  "mooncoin",
  "worldcoin",
  "viacoin",
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
  "commercium",
  // neoscrypt
  "crowdcoin",
  "halcyon",
  "phoenixcoin",
  "orbitcoin",
  "dinero",
  "simplebank",
  "innova",
  // cryptonight
  "digitalnote",
  "monerooriginal",
  "karbo",
  // lyra2rev2
  "galactrum",
  "rupee",
  "straks",
  // other/multi
  "xmy", // myriad-scrypt and myriad-sha
];
