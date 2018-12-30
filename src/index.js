const dotenv = require("dotenv");
dotenv.config();

const config = require("./config");
const logger = require("./logger");
const app = require("./app");

// Small error handler
app.use((err, req, res, next) => {
  // `err` might be undefined or null and might not have a `stack`
  if (err && err.stack) {
    logger.error(err.stack);
  } else {
    logger.error(err);
  }
  res.status(500).send("Internal Server Error. Check the logs for more information.");
});

const server = app.listen(config.PORT, () => {
  const address = server.address();
  logger.info(`Listening on ${address.address}:${address.port}`);
});
