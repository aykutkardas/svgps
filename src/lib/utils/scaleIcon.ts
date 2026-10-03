import svgpath from 'svgpath';

import { Icon, SvgPathAttrs } from '../types';
import parseViewBox from './parseViewBox';

// Rounding to 10 decimals drops floating point noise (e.g. 0.30000000000000004)
// without visibly changing the values.
const PRECISION = 10;
const round = (value: number) => Number(value.toFixed(PRECISION));

const scaleStrokeWidth = (attrs: SvgPathAttrs, scale: number) =>
  typeof attrs.strokeWidth === 'number'
    ? { ...attrs, strokeWidth: round(attrs.strokeWidth * scale) }
    : { ...attrs };

const scaleIcon = (icon: Icon, scale: number): Icon => {
  if (!Number.isFinite(scale) || scale <= 0) {
    throw new RangeError(`scale must be a positive number, got ${scale}`);
  }

  const paths: string[] = [];
  const attrs: SvgPathAttrs[] = [];

  icon.paths.forEach((path, index) => {
    // A transform on the element would not be scaled along with the path,
    // so it is applied to the path data first.
    const { transform, ...attr } = (icon.attrs[index] || {}) as SvgPathAttrs & {
      transform?: string;
    };
    let data = svgpath(path);
    if (transform) data = data.transform(transform);

    paths.push(data.scale(scale).round(PRECISION).toString());
    attrs.push(scaleStrokeWidth(attr, scale));
  });

  const viewBox = parseViewBox(icon.viewBox);

  return {
    ...icon,
    width: icon.width && round(icon.width * scale),
    height: icon.height && round(icon.height * scale),
    viewBox: viewBox.length
      ? viewBox.map((value) => round(value * scale)).join(' ')
      : icon.viewBox,
    paths,
    attrs,
    svgAttrs: scaleStrokeWidth(icon.svgAttrs, scale),
  };
};

export default scaleIcon;
