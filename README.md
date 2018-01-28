# [nicehash-calculator-web](https://nicehash.garbomuffin.com)

This is the source code for a website that shows you the profitability of buying hashing power on NiceHash.
If you're here for the site use the link above. (https://nicehash.garbomuffin.com)

To WhatToMine or NiceHash: If you would want me to reduce API requests, stop using your name, or anything like that then make an issue in this repo.

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

### Data updates

In order to reduce WhatToMine API requests this will cache data and avoid getting new data unless required when in development. **You should let it complete the first sweep of gathering data before stopping it** otherwise it will not save its cache.
