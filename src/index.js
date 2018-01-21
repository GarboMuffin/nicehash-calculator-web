const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
if (process.env.NODE_ENV !== "production") {
  app.use(require("errorhandler")());
}

const server = app.listen(8080, () => {
  const address = server.address();
  console.log(`Listening on ${address.address}:${address.port}`);
});
