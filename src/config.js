const PORT = process.env.PORT || 8080;
const REFRESH_TIME = 1000 * 60 * 60; // 1 hour, considering raising this even more

module.exports = {
  PORT,
  REFRESH_TIME,
};
