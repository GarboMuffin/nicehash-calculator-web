const dotenv = require("dotenv");
dotenv.config();

const logger = require("./logger");

const app = require("./app");
if (process.env.NODE_ENV !== "production") {
  app.use(require("errorhandler")());
}

const config = require("./config");

const server = app.listen(config.PORT, () => {
  const address = server.address();
  logger.info(`Listening on ${address.address}:${address.port}`);
});
