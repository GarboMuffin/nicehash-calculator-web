const childProcess = require("child_process");
const chalk = require("chalk");
const logger = require("./logger");

const PROCESS_ARGS = [
  // basic args to output data that is parasable
  "--no-header",
  "--output=json",
  "--sleep-time=2500",

  // takes ~225 seconds to do a full update with sleep time @ 2500
  // this will allow the cache to be utilized to some extent (reducing requests) but also still provide accurate numbers
  "--max-age=300",

  // don't specify any coins to let it run through all the coins
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

    const calculator = childProcess.fork("../nicehash-calculator/index.js", PROCESS_ARGS, {
      // set the correct working directory
      cwd: dir + "/nicehash-calculator",
      // dont pass arguments from this onto the program
      // eg. --inspect or --inspect-brk will cause problems if enabled
      execArgv: [],
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
};
