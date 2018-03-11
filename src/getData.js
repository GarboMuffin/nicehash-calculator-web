const childProcess = require("child_process");
const fs = require("fs");

const logger = require("./logger");

const PROCESS_ARGS = [
  // basic args to output data that is parasable
  "--no-header",
  "--output=json",

  // go slow enough to avoid any possible rate limits
  "--sleep-time=2500",

  // takes ~225 seconds to do a full update with sleep time @ 2500
  // this will allow the cache to be utilized to some extent (reducing requests) but also still provide accurate numbers
  "--max-age=300",

  // for development it can be handy to only enable on a few coins
  // "bitcoin",
  // "litecoin",

  // these coins have a history of having an ROI of <= -99%
  // '-coin_name' disables that coin

  // sha-256
  "-crown",
  "-unobtanium",
  "-zetacoin",
  // scrypt
  "-bata",
  "-mooncoin",
  "-worldcoin",
  "-viacoin",
  "-dnotes",
  "-einsteinium",
  // x11
  "-qbc", // Québecoin, the fancy e seems to break it normally
  "-creamcoin",
  // equihash
  "-bitcoinz",
  // keccak, pretty much a dead market now so the entire algorithm could be disabled
  "-maxcoin",
  "-smartcash",
  // other/multi
  "-xmy", // myriad-scrypt and myriad-sha

  // coins I will not disable even though they have low profit:
  // Dogecoin - its dogecoin...
  // Verge-blake (2s) - only blake 2s coin
  // Quark - only quark coin
  // Sono - only skunk coin on whattomine and the only reason it has -100% is because whattomine has something broken
];

function getRawData() {
  return new Promise((resolve, reject) => {
    const result = [];

    logger.info("Starting update");

    const getDir = () => {
      const dir = __dirname.split(/[/\\]/g);
      dir.pop();
      return dir.join("/");
    };
    const dir = getDir();

    const calculator = childProcess.fork("../nicehash-calculator/index.js", PROCESS_ARGS, {
      // set the correct working directory
      cwd: dir + "/nicehash-calculator",
      // dont pass arguments from this onto the program
      // eg. --inspect or --inspect-brk will cause problems if enabled
      execArgv: [],
      // don't pipe stdin/stdout/stderr
      silent: true,
    });

    // when data comes through stdin it can be parsed
    calculator.stdout.on("data", (e) => {
      // Try to read the data as JSON
      // if the process is working normally then all that should be outputted is valid JSON
      let data;
      try {
        data = JSON.parse(e.toString());
      } catch (err) {
        logger.error(" > Error parsing child process output:");
        logger.error(err.stack);
        logger.error("Data: " + e.toString());
        calculator.kill();
        reject();
        return;
      }
      logger.info(`Updated coin: ${data.coin.displayName} (${data.coin.abbreviation})`);
      result.push(data);
    });

    calculator.on("exit", (e) => {
      logger.info("Ending update");
      resolve(result);
    });

    calculator.on("error", (e) => {
      logger.error(" > Child process error:");
      logger.error(err.stack);
      reject();
    });
  });
}

function parseData(rawData) {
  // Sort by algorithm then by name
  // TODO: consider sorting by profit instead of name?
  rawData.sort((a, b) => {
    const byAlgo = a.coin.algorithm.niceHash.id - b.coin.algorithm.niceHash.id;
    const aName = a.coin.displayName.toLowerCase();
    const bName = b.coin.displayName.toLowerCase();
    const byName = aName < bName ? -1 : aName > bName ? 1 : 0;
    return byAlgo || byName;
  });

  const date = new Date();
  const data = {
    lastUpdated: date,
    coins: rawData,
  };

  return data;
}

module.exports = (app) => {
  return getRawData().then((rawData) => parseData(rawData));
}
