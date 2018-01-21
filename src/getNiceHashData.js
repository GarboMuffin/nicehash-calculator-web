const childProcess = require("child_process");
const chalk = require("chalk");
const logger = require("./logger");

const COINS = [
  // scrypt
  "litecoin",

  // neoscrypt
  "vivo",
  "feathercoin",

  // sha256
  "bitcoin",
  "bitcoincash",

  // equihash
  "zcash",
  "zclassic",
  "zencash",
  "bitcoingold",
  "hush",

  // ethash
  "ethereum",
  "ethereumclassic",
  "ubiq",
  "expanse",
  "music",

  // cryptonight
  "monero",
  "electroneum",
  "sumokoin",
  "bytecoin",

  // sia
  "sia",

  // decred
  "decred",

  // lyra2rev2
  "verge",

  // skunk
  "altcommunity",

  // pascal
  "pascal",

  // lbry
  "lbry",
];

const PROCESS_ARGS = [
  // basic args to output data that is parasable
  "--no-header",
  "--json-output",

  // whattomine has a rpm of ~80 requests per minute i believe
  // this number isn't too great because of that but it makes developing faster
  "--sleep-time=500",

  ...COINS,
];

module.exports = () => {
  return new Promise((resolve, reject) => {
    const result = [];

    logger.info("Starting update");

    const getDir = () => {
      const dir = __dirname.split(/[/\\]/g);
      dir.pop();
      return dir.join("/");
    };
    const dir = getDir();

    const calculator = childProcess.fork("../nicehash-calculator/dist/index", PROCESS_ARGS, {
      // set the correct working directory
      cwd: dir + "/nicehash-calculator",
      // don't pipe stdin/stdout/stderr
      silent: true,
    });

    calculator.stdout.on("data", (e) => {
      let data;
      try {
        data = JSON.parse(e.toString());
      } catch (err) {
        logger.error(chalk.red(" > Error parsing child process output:"));
        logger.error(err.stack);
        calculator.kill();
        reject();
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
};
