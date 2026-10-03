import svgpath from 'svgpath';

import { IcomoonIcon, Icon, SvgPathAttrs } from '../types';
import parseViewBox from '../utils/parseViewBox';
import { uniq } from '../utils/object';

const scaleStrokeWidth = (attr: SvgPathAttrs, scale: number): SvgPathAttrs => {
  const newAttr = { ...attr };

  if (newAttr.strokeWidth) {
    newAttr.strokeWidth = newAttr.strokeWidth * scale;
  }

  return newAttr;
};

export const icomoon = (icon: Icon): IcomoonIcon => {
  // Fall back to the icon's own size when the SVG has no viewBox
  const [, , viewBoxWidth = icon.width, viewBoxHeight = icon.height] =
    parseViewBox(icon.viewBox);
  const scale = 1024 / Math.max(viewBoxWidth, viewBoxHeight);

  const paths = icon.paths.map((path) =>
    svgpath(path).scale(scale).round(1).toString(),
  );

  icon.attrs = icon.attrs.map((attr) =>
    scaleStrokeWidth(
      {
        ...icon.svgAttrs,
        ...attr,
      },
      scale,
    ),
  );

  const attrs = icon.attrs;
  const width = Math.round(viewBoxWidth * scale);

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
