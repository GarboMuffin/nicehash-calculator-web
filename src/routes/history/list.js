const dataOperations = require("../../data");
const render = require("../render");

module.exports = async function renderHistoryList(req, res) {
  const files = await dataOperations.listSavedData();
  render(res, "history/list", {
    data: files,
  });
};
