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
import { parse } from 'svgps';
// or: import parse from 'svgps';
// or: const { parse } = require('svgps');

parse(`<svg>...</svg>`);
```

```js
// Output
{
  "width": 192,
  "height": 192,
  "viewBox": "0 0 256 256",
  "svgAttrs": {
    "fill": "#000000"
  },
  "attrs": [
    {
      "fill": "none"
    },
    {
      "fill": "none",
      "stroke": "#000000",
      "strokeLinecap": "round",
      "strokeLinejoin": "round",
      "strokeWidth": 12
    },
    // ...
  ],
  "paths": [
    "M 0 0, 0 256, 256 256, 256 0, 0 0",
    "M 216 40, 216 216",
    "M 72 56, 72 112, 184 112, 184 56, 72 56",
    "M 32 144, 32 200, 184 200, 184 144, 32 144"
  ]
}
```

### IcoMoon Template

```js
parse(`<svg>...</svg>`, { template: 'icomoon' });
```

```js
// Output
{
  "icon": {
    "width": 1024,
    "attrs": [
      {
        "fill": "none"
      },
      {
        "fill": "none",
        "stroke": "#000000",
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeWidth": 48
      },
      // ...
    ],
    "paths": [
      "M0 0L0 1024 1024 1024 1024 0 0 0",
      "M864 160L864 864",
      "M288 224L288 448 736 448 736 224 288 224",
      "M128 576L128 800 736 800 736 576 128 576"
    ]
  },
  "properties": {
    "name": ""
  }
}

```

## Utils

Shape-to-path helpers used internally are also exported:

```js
import { circleToPath, rectToPath, lineToPath, polygonToPath } from 'svgps';

circleToPath({ cx: 12, cy: 12, r: 10 });
rectToPath({ x: 0, y: 0, width: 24, height: 12 });
lineToPath({ x1: 0, y1: 0, x2: 24, y2: 24 });
polygonToPath('12 15 17 21 7 21 12 15');
```

## TypeScript

Types are included:

```ts
import { parse, type Icon, type IcomoonIcon, type ParseOptions } from 'svgps';
```
