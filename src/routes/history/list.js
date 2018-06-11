const dataOperations = require("../../data");
const render = require("../render");

async function getData() {
  return await dataOperations.listSavedData();
}

module.exports = async function renderHistoryList(req, res) {
  const data = await getData();
  render(res, "history/list", {
    data,
  });
};

module.exports.json = async function renderRawHistoryList(req, res) {
  res.jsonp(await getData());
}
