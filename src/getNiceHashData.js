const childProcess = require("child_process");
const chalk = require("chalk");

const PROCESS_ARGS = [
  // basic args to output data that is parasable
  "--no-header",
  "--json-output",

  // coins
  "bitcoin",
  "litecoin",
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
      console.log("nicehash-calculator: exit");
      resolve(result);
    });

    calculator.on("error", (e) => {
      console.error(chalk.red(" > Child process error:"));
      console.error(err.stack);
      reject();
    });
  });
};
