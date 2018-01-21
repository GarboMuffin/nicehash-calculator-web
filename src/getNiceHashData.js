const childProcess = require("child_process");
const chalk = require("chalk");

const COINS = [
  // coins
  // scrypt
  "litecoin",

  // sha256
  "bitcoin",
  "bitcoincash",

  // equihash
  "zcash",
  "zclassic",
  "zencash",
  "bitcoingold",

  // ethash
  "ethereum",
  "ethereumclassic",
  "ubiq",
  "expanse",

  // cryptonight
  "monero",
  "electroneum",

  // sia
  "sia",
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
        console.error(chalk.red(" > Error parsing child process output:"));
        console.error(err.stack);
        calculator.kill();
        reject();
      }
      console.log(data);
      result.push(data);
    });

    calculator.on("exit", (e) => {
      resolve(result);
    });

    calculator.on("error", (e) => {
      console.error(chalk.red(" > Child process error:"));
      console.error(err.stack);
      reject();
    });
  });
};
