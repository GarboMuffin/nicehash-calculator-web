const dataOperations = require("../../data");
const render = require("../render");

async function getData(req) {
  const dateParam = req.params.date;
  if (!isFinite(dateParam)) {
    return null;
  }
  const file = `data/${dateParam}.json`;
  try {
    var data = await dataOperations.getSavedData(file);
  } catch (e) {
    return null;
  }
  data.coins = data.coins.map((coin) => coin.renderData);
  return data;
}

module.exports = async function renderHistoryTable(req, res, next) {
  const data = await getData(req);
  if (data === null) {
    next();
    return;
  }
  // console.log(data);
  render(res, "history/table", {
    sourceDate: new Date(+req.params.date),
    data: data,
  });
};

module.exports.json = async function renderRawHistoryTable(req, res, next) {
  const data = await getData(req);
  if (data === null) {
    next();
    return;
  }
  res.jsonp(data);
};
