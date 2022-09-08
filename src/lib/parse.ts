import { IcomoonIcon, Icon, RawIcon, Template } from './types';

import { parse as muninnParse } from 'muninn';

import { icomoon } from './template/icomoon';
import circleToPath from './utils/circleToPath';
import lineToPath from './utils/lineToPath';

const getPolygonPoints = (point?: string) =>
  point?.startsWith('M') ? point : 'M' + point;

const getCircleToPath = (circle: { cx: number; cy: number; r: number }) =>
  circleToPath(circle.cx, circle.cy, circle.r);

const getLineToPath = (line: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) => lineToPath(line.x1, line.y1, line.x2, line.y2);

interface ParseOptions {
  template?: Template;
}

export const parse = (
  svg: string,
  options?: ParseOptions
): IcomoonIcon | Icon => {
  const strokeWidthSelector = {
    selector: '@ stroke-width',
    transform: (value) => {
      if (value === null) return null;
      return Number(value);
    },
  };
  // @ts-ignore [TODO]: Fix this
  const data: RawIcon = muninnParse(svg, {
    schema: {
      points: {
        selector: 'polygon, polyline @ points | array',
        transform: getPolygonPoints,
      },
      lines: {
        selector: 'line | array',
        schema: {
          x1: '@ x1 | number',
          y1: '@ y1 | number',
          x2: '@ x2 | number',
          y2: '@ y2 | number',
        },
      },
      circles: {
        selector: 'circle | array',
        schema: {
          cx: '@ cx | number',
          cy: '@ cy | number',
          r: '@ r | number',
        },
      },
      paths: { selector: 'path @ d | array', initial: [] },
      width: 'svg @ width | number',
      height: 'svg @ height | number',
      viewBox: 'svg @ viewBox',
      attrs: {
        selector: 'path, polygon, polyline, circle | array',
        schema: {
          clipRule: '@ clip-rule',
          fillRule: '@ fill-rule',
          stroke: '@ stroke',
          fill: '@ fill',
          strokeLinecap: '@ stroke-linecap',
          strokeLinejoin: '@ stroke-linejoin',
          strokeWidth: strokeWidthSelector,
        },
      },
      svgAttrs: {
        selector: 'svg',
        schema: {
          clipRule: '@ clip-rule',
          fillRule: '@ fill-rule',
          fill: '@ fill',
          stroke: '@ stroke',
          strokeLinecap: '@ stroke-linecap',
          strokeLinejoin: '@ stroke-linejoin',
          strokeWidth: strokeWidthSelector,
        },
      },
    },
  });

  if (data.viewBox) {
    const [, , width, height] = data.viewBox.split(' ').map(parseInt);

    data.width = data.width || width;
    data.height = data.height || height;
  }

  if (Array.isArray(data.points)) {
    data.points.forEach((point) => data.paths.unshift(point));
  }

  if (Array.isArray(data.circles)) {
    data.circles.forEach((circle) =>
      data.paths.unshift(getCircleToPath(circle))
    );
  }

  if (Array.isArray(data.lines)) {
    data.lines.forEach((line) => data.paths.unshift(getLineToPath(line)));
  }

  delete data.points;
  delete data.circles;
  delete data.lines;

  const isIcomoon = options && options.template === 'icomoon';

  return isIcomoon ? icomoon(data) : data;
};
