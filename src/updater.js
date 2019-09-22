// The internal format of storing data has changed.
// In order to avoid data loss, this updater will convert old data to new data when it detects it.

const fs = require('fs');
const path = require('path');
const util = require('util');
const zlib = require('zlib');
const logger = require('./logger');

const gzip = util.promisify(zlib.gzip);
const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const deleteFile = util.promisify(fs.unlink);

const latestVersion = '1';
const versionPath = path.join(__dirname, '.version');
const currentVersion = getVersion();

function getVersion() {
  try {
    return fs.readFileSync(versionPath).toString();
  } catch (e) {
    return '0';
  }
}

async function compressFiles() {
  logger.info('[Updater] Compressing existing data files in the background. This may take a while.');
  let files = await readDir('data');
  files = files.filter((i) => i.endsWith('.json'));
  for (const file of files) {
    const path = 'data/' + file;
    const content = await readFile(path);
    const compressedContent = await gzip(content);
    await writeFile(path + '.gz', compressedContent);
    await deleteFile(path);
  }
  logger.info('[Updater] Finished compressing files');
}

function updateVersionNumber() {
  fs.writeFileSync(versionPath, latestVersion);
}

if (currentVersion !== latestVersion) {
  if (currentVersion === '0') {
    compressFiles().then(updateVersionNumber);
  }
}
