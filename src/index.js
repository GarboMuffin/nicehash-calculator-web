const dotenv = require("dotenv");
dotenv.config();
const errorhandler = require("errorhandler");

const config = require("./config");
const logger = require("./logger");
const app = require("./app");

if (!app.inProduction) {
  app.use(errorhandler());
}

if (config.PORT === 80 && app.inProduction) {
  logger.warn("Listening on port 80 in production? Really?");
}

const server = app.listen(config.PORT, () => {
  const address = server.address();
  logger.info(`Listening on ${address.address}:${address.port}`);
});
