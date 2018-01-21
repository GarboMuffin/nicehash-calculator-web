const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
if (process.env.NODE_ENV !== "production") {
  app.use(require("errorhandler")());
}

const config = require("./config");

const server = app.listen(config.PORT, () => {
  const address = server.address();
  console.log(`Listening on ${address.address}:${address.port}`);
});
