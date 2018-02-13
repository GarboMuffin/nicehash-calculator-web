const PORT = process.env.PORT || 8080;
const REFRESH_TIME = 1000 * 60 * 60 * 4; // 4 hours, prod often uses a different number here

module.exports = {
  PORT,
  REFRESH_TIME,
};
