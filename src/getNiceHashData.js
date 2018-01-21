const childProcess = require("child_process");
const chalk = require("chalk");
const logger = require("./logger");

const PROCESS_ARGS = [
  // basic args to output data that is parasable
  "--no-header",
  "--json-output",
  "--user-agent=\"Make an issue if problems: github.com/GarboMuffin/nicehash-calculator-web\"",

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
