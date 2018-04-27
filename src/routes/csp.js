const logger = require("../logger");

module.exports = function handleCSPViolation(req, res) {
  logger.warn("CSP Violation: " + JSON.stringify(req.body));
  res.status(204).end();
};
