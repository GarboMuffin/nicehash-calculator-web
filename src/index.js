const dotenv = require("dotenv");
dotenv.config();

const logger = require("./logger");
const errorhandler = require("errorhandler");
const app = require("./app");
const config = require("./config");

if (process.env.NODE_ENV !== "production") {
  app.use(errorhandler());
}

const server = app.listen(config.PORT, () => {
  const address = server.address();
  logger.info(`Listening on ${address.address}:${address.port}`);
});
