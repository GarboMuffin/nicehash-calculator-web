const fs = require("fs");
const promisify = require("util").promisify;
const writeFile = promisify(fs.writeFile);
const mkdirp = require("mkdirp");

const logger = require("./logger");

mkdirp("data");

async function saveData(data) {
  try {
    const stringToWrite = JSON.stringify(data);
    const date = (new Date(data.lastUpdated)).valueOf();
    await writeFile("data.json", stringToWrite);
    await writeFile(`data/${date}.json`, stringToWrite);
    logger.info("Saved data");
  } catch (e) {
    logger.error(" > Couldn't save data:");
    logger.error(e.stack);
  }
}

module.exports = saveData;
