const fs = require("fs");

const logger = require("./logger");

function getSavedData() {
  return new Promise((resolve, reject) => {
    fs.readFile("data.json", (err, buffer) => {
      // resolve() with empty JSON is used instead of reject()

      if (err) {
        logger.warn("Missing data.json");
        resolve({});
      }
      let data;
      try {
        data = JSON.parse(buffer.toString());
      } catch (e) {
        logger.error("Malformed JSON in data.json");
        resolve({});
      }
      logger.info("Loaded data.json");
      resolve(data);
    });
  });
}

module.exports = getSavedData;
