const svgpath = require('svgpath');
const uniq = require('lodash.uniq');

import { IcomoonIcon, Icon, SvgPathAttrs } from '../types';

const clearEmptyAttr = (attr: SvgPathAttrs): SvgPathAttrs => {
  const newAttr = { ...attr };

  Object.keys(newAttr).forEach((key) => {
    if (newAttr[key] !== null) return;
    delete newAttr[key];
  });

  return newAttr;
};

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

  const svgAttrs = clearEmptyAttr(icon.svgAttrs);

  icon.attrs = icon.attrs.map((attr) =>
    scaleStrokeWidth(
      {
        ...svgAttrs,
        ...clearEmptyAttr(attr),
      },
      scale
    )
  );

  // @ts-ignore [TODO]: Fix this
  const scalePath = (path) => svgpath(path).scale(scale).round(1).toString();

  const attrs = icon.attrs;
  const paths = icon.paths.map(scalePath);
  const width = Math.round(Math.max(viewBoxWidth) * scale);

  const uniqueFills = uniq(attrs.map(({ fill }) => fill));
  const uniqueStrokes = uniq(attrs.map(({ stroke }) => stroke));
  const hasNoneFill = uniqueFills.includes('none');
  const hasNoneStroke = uniqueStrokes.includes('none');

  if (uniqueFills.length === 1 && !hasNoneFill) {
    attrs.forEach((attr) => delete attr.fill);
  }
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
