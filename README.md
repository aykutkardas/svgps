# svgps

[![npm version](https://img.shields.io/npm/v/svgps.svg)](https://www.npmjs.com/package/svgps)
[![npm downloads](https://img.shields.io/npm/dm/svgps.svg)](https://www.npmjs.com/package/svgps)
[![CI](https://github.com/aykutkardas/svgps/actions/workflows/ci.yml/badge.svg)](https://github.com/aykutkardas/svgps/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/svgps.svg)](./LICENSE)

Parse an SVG string into plain JSON: path data, per-path attributes and SVG-level attributes. Basic shapes are converted to paths, and an [IcoMoon](https://icomoon.io/) template is included.

- Converts `<circle>`, `<rect>`, `<line>`, `<polygon>` and `<polyline>` to path data
- Collects each element's attributes as camelCased keys (`stroke-width` → `strokeWidth`)
- Reads `width` / `height` from the `<svg>` element, or from `viewBox` when they are missing
- Optional `icomoon` output: scaled to a 1024 grid, ready for IcoMoon-style icon sets
- Ships with TypeScript types

## Install

```sh
npm install svgps
```

Requires Node.js 20.18.1 or newer.

## Usage

```js
import { parse } from 'svgps';
// or: import parse from 'svgps';
// or: const { parse } = require('svgps');

const icon = parse(`
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <path d="M8 12h8" stroke="#ff0000" />
  </svg>
`);
```

```json
{
  "width": 24,
  "height": 24,
  "viewBox": "0 0 24 24",
  "paths": [
    "M 12 12 m -10, 0a 10 10 0 1 0 20 0a 10 10 0 1 0 -20 0",
    "M 12 8, 12 16",
    "M8 12h8"
  ],
  "attrs": [{}, {}, { "stroke": "#ff0000" }],
  "svgAttrs": {
    "fill": "none",
    "stroke": "currentColor",
    "strokeWidth": 2,
    "strokeLinecap": "round"
  }
}
```

`paths[i]` and `attrs[i]` describe the same element. Attributes set on the `<svg>` element are returned separately in `svgAttrs`.

### IcoMoon template

```js
parse(svg, { template: 'icomoon' });
```

```json
{
  "icon": {
    "width": 1024,
    "paths": [
      "M512 512m-426.7 0a426.7 426.7 0 1 0 853.4 0 426.7 426.7 0 1 0-853.4 0",
      "M512 341.3L512 682.7",
      "M341.3 512h341.4"
    ],
    "attrs": [
      { "fill": "none", "stroke": "currentColor", "strokeWidth": 85.33333333333333, "strokeLinecap": "round" },
      { "fill": "none", "stroke": "currentColor", "strokeWidth": 85.33333333333333, "strokeLinecap": "round" },
      { "fill": "none", "stroke": "#ff0000", "strokeWidth": 85.33333333333333, "strokeLinecap": "round" }
    ]
  },
  "properties": { "name": "" }
}
```

With the `icomoon` template:

- Paths are scaled so the larger side of the `viewBox` becomes 1024, and `strokeWidth` is scaled by the same ratio.
- `svgAttrs` are merged into every path's `attrs`.
- When every path shares the same `fill` (or `stroke`) and it is not `none`, that key is removed from `attrs` so the icon's color can be set from outside.

## API

### `parse(svg, options?)`

| Argument           | Type         | Description                                    |
| ------------------ | ------------ | ---------------------------------------------- |
| `svg`              | `string`     | SVG markup                                     |
| `options.template` | `'icomoon'`  | Return the IcoMoon format instead of `Icon`    |

Returns an `Icon`, or an `IcomoonIcon` when `template: 'icomoon'` is set.

### Shape helpers

The helpers used to convert basic shapes are exported as well:

```js
import { circleToPath, rectToPath, lineToPath, polygonToPath } from 'svgps';

circleToPath({ cx: 12, cy: 12, r: 10 });
rectToPath({ x: 0, y: 0, width: 24, height: 12 });
lineToPath({ x1: 0, y1: 0, x2: 24, y2: 24 });
polygonToPath('12 15 17 21 7 21 12 15');
```

## TypeScript

```ts
import { parse, type Icon, type IcomoonIcon, type ParseOptions } from 'svgps';
```

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT](./LICENSE) © Aykut Kardaş
