# svgps

[![npm](https://img.shields.io/npm/v/svgps?color=%234fc921)](https://www.npmjs.com/package/svgps)
[![License](https://img.shields.io/badge/License-MIT-green.svg?color=%234fc921)](https://opensource.org/licenses/MIT)

SVG Parser

## Install

```
npm install svgps
```

## Usage

#### getFormattedName

```js
import { getFormattedName } from "svgps";

getFormattedName("Green Apple.svg");

// "green-apple"
```

#### parse

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

## CLI

### Install Globally

```
npm install -g svgps
```

### Usage

Syntax

```
svgps <input-dir-path> <output-dir-path>
```

Output

```js
// FILE: <output-directory-path>/icons.json
{
  "green-apple": {
    "paths": ["M204.8,0 ...", "M0,0 ...", "M50.56,0 ..."],
    "fills": ["#41B883", "#41B883", "#35495E"],
    "width": 256,
    "height": 221,
    "viewBox": "0 0 256 221"
  },
  // ...
}
```
