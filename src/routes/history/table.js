const path = require('path');
const dataOperations = require("../../data");
const render = require("../render");

async function getData(req) {
  const dateParam = req.params.date;
  if (!isFinite(dateParam)) {
    return null;
  }
  const dataFolder = 'data';
  const file = path.join(dataFolder, dateParam + '.json.gz');
  if (file.indexOf(dataFolder) !== 0) {
    return null;
  }
  try {
    var data = await dataOperations.getSavedData(file);
  } catch (e) {
    return null;
  }
  return data;
}

module.exports = async function renderHistoryTable(req, res, next) {
  const data = await getData(req);
  if (data === null) {
    next();
    return;
  }
  data.coins = data.coins.map((coin) => coin.renderData);
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
