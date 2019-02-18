# [nicehash-calculator-web](https://nicehash.garbomuffin.com)

A website that automatically estimates the profitability of buying hashing power on NiceHash.
**If you're just looking for the calculations, then please visit the website: https://nicehash.garbomuffin.com**

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

All required setup is completed. The default config is that of a development environment.

data will not be automatically updated due to API rate limits by default. For most development purposes the age of the data doesn't matter; there just has to be something to render. This can be changed by enabling production mode (see "Production Setup" below) or by setting `module.exports.ALLOW_UPDATES` to `true` in `src/config.js`.

## Running it

```bash
node index
```

(If you get a `TypeError: util.promisify is not a function` (or similar), make sure you're running Node 8 or higher.)

By default this listens on port 8080, and you can visit [`http://localhost:8080`](http://localhost:8080) in your browser to visit the site. You can change the this with the `PORT` environment variable or by changing `module.exports.PORT` in `src/config.js`.

## Production Setup

Enable production mode by setting the `NODE_ENV` environment variable to `production` (recommended) or by setting `module.exports.IN_PRODUCTION` to `true` in `src/config.js`. This should also enable automatic data updates unless you made further changes to the configuration.

You can edit `module.exports.REFRESH_TIME` to change the time between each data update in milliseconds. (hint: `3600000` is 1 hour, and low values might get you temporarily blocked from the What To Mine API) You can also edit `module.exports.DISABLED_COINS` to restrict or increase the amount of coins to be displayed. (hint: use coin or algorithm names and tickers) You'll probably want to change some of the templates in `src/views` such as GitHub links, donation addresses, data licensing, etc.

Use a reverse proxy like nginx if you want SSL, caching, Content-Security-Policy, etc.
