// Port for the node process to run its webserver on
// Can be controlled with the PORT environment variable, and defaults to 8080.
module.exports.PORT = process.env.PORT || 8080;
// module.exports.PORT = 1234; // uncomment to edit

// The time between each data update, in milliseconds.
// Setting this too low may get you blocked by What To Mine for too sending many requests.
// 1000 * 60 * 60 === 1 hour
module.exports.REFRESH_TIME = 1000 * 60 * 60 * 2;

// Is the process running in a production environment?
// Defaults to testing if the NODE_ENV environment variable is set to "production"
module.exports.IN_PRODUCTION = process.env.NODE_ENV === "production";
// module.exports.IN_PRODUCTION = true; // uncomment to enable production mode

// Should coin data be automatically updated?
// Defaults to true in production, false in development
module.exports.ALLOW_UPDATES = module.exports.IN_PRODUCTION;
// module.exports.ALLOW_UPDATES = true; // uncomment to enable updates

// Is the app running behind a reverse proxy?
// In development you have no reason to change this.
// However, in production you want to make sure you set this to false IF (and only if) you are NOT using a reverse proxy. (like nginx or apache)
module.exports.REVERSE_PROXY = true;
// module.exports.REVERSE_PROXY = false; // uncomment if not using a reverse proxy

// Coins that will be ignored in updates, usually for having a historically very low ROI.
// Putting coins here can declutter the already very large table and reduces the time needed for each update.
// It also reduces your chances of being blocked by What To Mine for too sending many requests.
module.exports.DISABLED_COINS = [
  // sha-256
  "crown",
  "unobtanium",
  "zetacoin",
  // scrypt
  "aur-scrypt",
  "mooncoin",
  "worldcoin",
  "viacoin",
  "einsteinium",
  "florin",
  "dogecoin",
  "linx",
  "litecoinplus",
  "gulden",
  // x11
  "startcoin",
  "influxcoin",
  "adzcoin",
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
  "traid",
  // cryptonight
  "monerooriginal",
  "karbo",
  "dinastycoin",
  "sumokoin",
  "bytecoin",
  // lyra2rev2
  "galactrum",
  "straks",
  "hana",
  // daggerhashimoto
  "ellaism",
  "expanse",
  "pirl",
  "music",
  "dbix",
  // keccak
  "maxcoin",
  // x16r
  "xmn",
  "hlx",
  // zhash
  "anon",
  "btcz",
  "xsg",
  // quark
  "quark",
  // multi algo
  "xmy", // myriad-scrypt, myriad-sha
  // temporary hack to avoid errors
  "sia",
];
// module.exports.DISABLED_COINS = []; // uncomment to enable all coins, but you really shouldn't do that.
