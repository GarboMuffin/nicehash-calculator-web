# [nicehash-calculator-web](https://nicehash.garbomuffin.com)

Source code for a website that estimates the profitability of buying hashing power on NiceHash.
**If you're here for estimations then go to the website: https://nicehash.garbomuffin.com**

Everything here is instructions to run your own copy of the website. (for developing or something)

_This README is incomplete. You can make an issue if you need help trying to run this locally._

## Cloning

```bash
# remember the --recursive argument
$ git clone --recursive https://github.com/GarboMuffin/nicehash-calculator-web
```

## Installing and building

```bash
# move to where you cloned the repo
$ cd /path/to/repo/

# install the dependencies for the website
$ npm install
# build js and scss
$ npm run build

# now for the nicehash-calculator base...
$ cd nicehash-calculator
# get the dependencies
$ npm install
# build typescript
$ npm run build
```

Whenever you pull you will probably have to run some similar commands.

## Development setup

[Download the latest data.json](https://nicehash.garbomuffin.com/data.json) and save it as `data.json` in the root of this repository. When in a non-production environment the program will not do any automatic updates for various reasons. For most development purposes the age of the data doesn't matter. There just has to be something to render.

In Linux this is easy to do from the command line:
```bash
$ cd /path/to/repo/
$ wget https://nicehash.garbomuffin.com/data.json
```

If you want automatic updates (such as when in production) create a file named `.env` in the root of the repository and add this line: `NODE_ENV=production`.

## Running it

```bash
$ node index
...
```

By default it listens on port 8080. Visit [`http://localhost:8080`](http://localhost:8080) in your browser to visit the site. You can change the port by adding `PORT=1234` to `.env` in the root of this repo. (you may have to make the file)
