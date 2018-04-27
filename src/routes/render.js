const config = require("../config");

module.exports = function render(res, page, opts = {}) {
  opts.inProduction = config.IN_PRODUCTION;
  res.render(page, opts);
};
