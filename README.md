# svgps

[![npm](https://img.shields.io/npm/v/svgps?color=%234fc921)](https://www.npmjs.com/package/svgps)
[![License](https://img.shields.io/badge/License-MIT-green.svg?color=%234fc921)](https://opensource.org/licenses/MIT)

SVG Parser

## Install

```
npm install svgps
```

## Usage

```js
import { parse } from "svgps";

parse(`<svg>...</svg>`);
```

```js
// Output
{
  "paths": ["M204.8,0 ...", "M0,0 ...", "M50.56,0 ..."],
  "fills": ["#41B883", "#41B883", "#35495E"],
  "width": 256,
  "height": 221,
  "viewBox": "0 0 256 221",
  "attrs": [],
  "svgAttrs": { "fill": "#f00", "stroke": "#00f" }
}
```

### IcoMoon Template

```js
parse(`<svg>...</svg>`, { template: "icomoon" });
```

```js
// Output
{
  "icon": {
    "paths": [
      "M204.8,0 ...",
      "M0,0 ...",
      "M50.56,0 ..."
    ],
    "attrs": [
      {
        "fill": "#41B883"
      },
      {
        "fill": "#41B883"
      },
      {
        "fill": "#35495E"
      }
    ],
    "width": 1024,
  },
  properties: {}
}
```
