# NOTE: This project is no longer maintained

https://github.com/GarboMuffin/nicehash-calculator-web/issues/20

The website has been shut down for several years. I no longer own the domain that it was running on.

# nicehash-calculator-web

A website that automatically estimates the profitability of buying hashing power on NiceHash.

My [nicehash-calculator](https://github.com/GarboMuffin/nicehash-calculator) project is responsible for doing the calculations; this project is effectively just a web frontend for its data.

## Cloning

```bash
$ git clone https://github.com/GarboMuffin/nicehash-calculator-web
```

## Installing and building

```bash
# install the dependencies for the website
npm install
```

## Development setup

You may want to download the [latest data.json](https://nicehash.garbomuffin.com/data.json) and save it as `data.json` in the root of the repository to skip waiting a few minutes for a data update to finish, but this is not required.

Data will not be automatically updated by default. For most development purposes the age of the data doesn't matter; there just has to be something to render. This can be changed by enabling production mode (see "Production Setup" below) or by setting `module.exports.ALLOW_UPDATES` to `true` in `src/config.js`.

## Running it

```bash
node index
```

(If you get a `TypeError: util.promisify is not a function` or similar, make sure you're running Node 8 or higher.)

By default this listens on port 8080, and you can visit [`http://localhost:8080`](http://localhost:8080) in your browser to visit the site. You can change the this with the `PORT` environment variable or by changing `module.exports.PORT` in `src/config.js`.

## Production Setup

Enable production mode by setting the `NODE_ENV` environment variable to `production` (recommended, many services do this for you) or by setting `module.exports.IN_PRODUCTION` to `true` in `src/config.js`. This should also enable automatic data updates unless you made further changes to the configuration.

You can edit `module.exports.REFRESH_TIME` to change the time between each data update in milliseconds. You can also edit `module.exports.DISABLED_COINS` to restrict or increase the amount of coins to be displayed. (hint: use [coin or algorithm names and tickers](https://github.com/GarboMuffin/nicehash-calculator#coins)) You'll probably want to change some of the templates in `src/views` such as GitHub links (index.pug), donation addresses (layout.pug), data licensing (history/list.pug), etc.

Use a reverse proxy such as nginx if you want things like SSL, caching, etc.
