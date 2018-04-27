const render = require("./render");
const config = require("../config");

module.exports = function renderIndex(req, res, state) {
  render(res, "index", {
    data: state.renderedData,
    refreshTime: config.REFRESH_TIME,
  });
};
