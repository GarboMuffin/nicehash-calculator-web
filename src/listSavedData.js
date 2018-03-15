const fs = require("fs");
const util = require("util");
const readDir = util.promisify(fs.readdir);

async function listSavedData() {
  let files = await readDir("data");
  files = files.map((file) => file.replace(/\.json$/, ""));
  return files;
}

module.exports = listSavedData;
