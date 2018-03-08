const childProcess = require("child_process");
const fs = require("fs");
const chalk = require("chalk");

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

  // these coins have a history of having an ROI of <= -99%
  // '-coin_name' disables that coin
  "-bata",
  "-mooncoin",
  "-myriad-scrypt",
  "-viacoin",
  "-crown",
  "-myriad-sha",
  "-unobtanium",
  "-qbc", // Québecoin, the fancy e seems to break it normally
  "-maxcoin",
  "-smartcash",
  "-bitcoinz",
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
        logger.error(chalk.red(" > Error parsing child process output:"));
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
      logger.error(chalk.red(" > Child process error:"));
      logger.error(err.stack);
      reject();
    });
  });
}

function parseData(rawData) {
  // Sort by algorithm then by name
  // TODO: consider sorting by profit instead of name?
  rawData.sort((a, b) => {
    const byAlgo = a.coin.niceHashAlgo.id - b.coin.niceHashAlgo.id;
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

  fs.writeFile("data.json", JSON.stringify(data), (err) => {
    if (err) {
      logger.error(chalk.red(" > Couldn't save data.json:"));
      logger.error(err.stack);
    } else {
      logger.info("Saved data.json");
    }
  });

  return data;
}

module.exports = (app) => {
  return getRawData().then((rawData) => parseData(rawData));
}
