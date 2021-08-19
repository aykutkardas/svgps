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

#### getPaths

```js
import { getPaths } from "svgps";

getPaths(`<svg>...</svg>`);

// ["...", "...", "..."]
```

#### getFills

```js
import { getFills } from "svgps";

getFills(`<svg>...</svg>`);

// ["#41B883", "#41B883", "#35495E"]
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

Sample

```
svgps /home/my-project/assets/icons /home/my-project/src
```

Output

```json
// FILE: /home/my-project/src/icons.json
{
  "green-apple": ["...", "...", "..."]
}
```
