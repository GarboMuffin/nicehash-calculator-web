const dataOperations = require("../../data");
const render = require("../render");

module.exports = async function renderHistoryTable(req, res, next) {
  const dateParam = req.params.date;
  const file = `data/${dateParam}.json`;
  let data;
  try {
    data = await dataOperations.getSavedData(file);
  } catch (e) {
    next();
    return;
  }
  data.coins = data.coins.map((coin) => coin.renderData);
  render(res, "history/table", {
    sourceDate: new Date(+dateParam),
    data: data,
  });
};
