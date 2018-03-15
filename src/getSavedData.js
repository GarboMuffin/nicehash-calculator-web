const fs = require("fs");
const util = require("util");

const stat = util.promisify(fs.stat);
const readFile = util.promisify(fs.readFile);

async function getSavedData(file = "data.json") {
  try {
    const fileStat = await stat(file);
    if (!fileStat.isFile()) {
      throw new Error("");
    }
  } catch (e) {
    throw new Error("File does not exist");
  }

  const contents = await readFile(file);
  let data;
  try {
    data = JSON.parse(contents);
  } catch (e) {
    throw new Error("Malformed JSON");
  }

  return data;
}

module.exports = getSavedData;
