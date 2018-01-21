# [nicehash-calculator-web](https://nicehash.garbomuffin.com)

This is the source code for a website that shows you the profitability of buying hashing power on NiceHash.
If you're here for the site use the link above. (https://nicehash.garbomuffin.com)

## Cloning

```bash
# remember the --recursive argument
$ git clone --recursive https://github.com/GarboMuffin/nicehash-calculator-web
```

## Setting things up

```bash
# move to where you cloned the repo
$ cd /path/to/repo

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

## Running it

```bash
$ node index
...
```
