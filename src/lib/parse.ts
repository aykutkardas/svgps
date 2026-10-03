import { parse as muninnParse } from 'muninn';

import { IcomoonIcon, Icon, RawIcon, Template } from './types';
import { icomoon } from './template/icomoon';
import circleToPath from './utils/circleToPath';
import lineToPath from './utils/lineToPath';
import rectToPath from './utils/rectToPath';
import polygonToPath from './utils/polygonToPath';
import keyToCamelCase from './utils/keyToCamelCase';
import parseViewBox from './utils/parseViewBox';
import { omit, pick } from './utils/object';

export interface ParseOptions {
  template?: Template;
  /**
   * `icomoon` template only. By default a `fill`/`stroke` shared by every
   * path is removed so the icon color can be set from outside. Set this to
   * `true` to keep the original colors.
   */
  preserveColors?: boolean;
}

// Attributes that need to be converted to numbers
const calcKeys = [
  'cx',
  'cy',
  'r',
  'x',
  'y',
  'width',
  'height',
  'x1',
  'y1',
  'x2',
  'y2',
  'rx',
  'ry',
];

const ignoredSvgAttrs = [
  'class',
  'height',
  'width',
  'viewBox',
  'xmlns',
  'xlink',
  'version',
  'preserveAspectRatio',
];

export const parse = (
  svg: string,
  options?: ParseOptions,
): IcomoonIcon | Icon => {
  const getPaths = (el) => {
    const tagName = el.get(0).tagName;

    return {
      path: {
        selector: '@ $all',
        transform: (value) => {
          const calcValue = Object.fromEntries(
            Object.entries(pick(value, calcKeys)).map(([key, v]) => [
              key,
              Number(v),
            ]),
          ) as any;
          if (tagName === 'circle') {
            value.d = circleToPath(calcValue);
          } else if (tagName === 'line') {
            value.d = lineToPath(calcValue);
          } else if (tagName === 'polygon' || tagName === 'polyline') {
            value.d = polygonToPath(value.points);
          } else if (tagName === 'rect') {
            value.d = rectToPath(calcValue);
          }

          if (value['stroke-width']) {
            value['stroke-width'] = Number(value['stroke-width']);
          }

          return keyToCamelCase(omit(value, [...calcKeys, 'points']));
        },
      },
    };
  };

  // @ts-ignore [TODO]: Fix this
  const data: RawIcon = muninnParse(svg, {
    schema: {
      paths: {
        selector: 'path, polygon, polyline, circle, line, rect | array',
        schema: getPaths,
      },
      width: 'svg @ width | number',
      height: 'svg @ height | number',
      viewBox: 'svg @ viewBox',
      svgAttrs: {
        selector: 'svg @ $all',
        transform: (value) => ({
          ...omit(keyToCamelCase(value), ignoredSvgAttrs),
          ...(value['stroke-width']
            ? { strokeWidth: Number(value['stroke-width']) }
            : {}),
        }),
      },
    },
  });

  const icon: Icon = {
    width: data.width,
    height: data.height,
    paths: [],
    viewBox: data.viewBox,
    attrs: [],
    svgAttrs: data.svgAttrs,
  };

  if (data.viewBox) {
    const [, , width, height] = parseViewBox(data.viewBox);

    icon.width = data.width || width;
    icon.height = data.height || height;
  }

  icon.paths = data.paths.map(({ path }) => path.d);
  icon.attrs = data.paths.map(({ path: { d, ...attr } }) => attr);

  const isIcomoon = options && options.template === 'icomoon';

  return isIcomoon
    ? icomoon(icon, { preserveColors: options?.preserveColors })
    : icon;
};
