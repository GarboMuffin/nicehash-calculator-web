const fs = require("fs");

const logger = require("./logger");

function getSavedData() {
  return new Promise((resolve, reject) => {
    fs.readFile("data.json", (err, buffer) => {
      if (err) {
        reject();
      }
      let data;
      try {
        data = JSON.parse(buffer.toString());
      } catch (e) {
        reject();
      }
      logger.info("Loaded data.json");
      resolve(data);
    });
  });
}

module.exports = getSavedData;
