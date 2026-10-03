type RectAttrs = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rx?: number;
  ry?: number;
};

const isValidRadius = (value?: number) =>
  typeof value === 'number' && Number.isFinite(value) && value > 0;

const rectToPath = ({ x, y, width, height, rx, ry }: RectAttrs) => {
  const _x = x || 0;
  const _y = y || 0;
  const w = width || 0;
  const h = height || 0;

  // https://www.w3.org/TR/SVG2/geometry.html#RX
  // If only one radius is set, the other one uses the same value.
  let _rx = isValidRadius(rx) ? rx : isValidRadius(ry) ? ry : 0;
  let _ry = isValidRadius(ry) ? ry : _rx;
  _rx = Math.min(_rx, w / 2);
  _ry = Math.min(_ry, h / 2);

  if (!_rx || !_ry) {
    return `M ${_x} ${_y}, ${_x} ${h + _y}, ${w + _x} ${h + _y}, ${
      w + _x
    } ${_y}, ${_x} ${_y}`;
  }

  const arc = `A ${_rx} ${_ry} 0 0 1`;

  return [
    `M ${_x + _rx} ${_y}`,
    `H ${_x + w - _rx}`,
    `${arc} ${_x + w} ${_y + _ry}`,
    `V ${_y + h - _ry}`,
    `${arc} ${_x + w - _rx} ${_y + h}`,
    `H ${_x + _rx}`,
    `${arc} ${_x} ${_y + h - _ry}`,
    `V ${_y + _ry}`,
    `${arc} ${_x + _rx} ${_y}`,
    'Z',
  ].join(' ');
};

export default rectToPath;
