const svgpath = require('svgpath');
const _ = require('lodash');

import { IcomoonIcon, Icon, SvgPathAttrs } from '../types';

const scaleStrokeWidth = (attr: SvgPathAttrs, scale: number): SvgPathAttrs => {
  const newAttr = { ...attr };

  if (newAttr.strokeWidth) {
    newAttr.strokeWidth = newAttr.strokeWidth * scale;
  }

  return newAttr;
};

export const icomoon = (icon: Icon): IcomoonIcon => {
  const [, , viewBoxWidth, viewBoxHeight] = icon.viewBox.split(' ').map(Number);
  const scale = 1024 / Math.max(viewBoxWidth, viewBoxHeight);

  const paths = icon.paths.map((path) =>
    svgpath(path).scale(scale).round(1).toString()
  );

  icon.attrs = icon.attrs.map((attr) =>
    scaleStrokeWidth(
      {
        ...icon.svgAttrs,
        ...attr,
      },
      scale
    )
  );

  const attrs = icon.attrs;
  const width = Math.round(Math.max(viewBoxWidth) * scale);

  const uniqueStrokes = _.uniq(attrs.map(({ stroke }) => stroke));
  const hasNoneStroke = uniqueStrokes.includes('none');

  if (uniqueStrokes.length === 1 && !hasNoneStroke) {
    attrs.forEach((attr) => delete attr.stroke);
  }

  return {
    icon: {
      paths,
      attrs,
      width,
    },
    properties: {
      name: '',
    },
  };
};
