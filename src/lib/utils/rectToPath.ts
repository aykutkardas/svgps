// [TODO]: Add `rx` support
const rectToPath = ({ x, y, width: w, height: h, rx = 0 }) => {
  const _x = x || 0;
  const _y = y || 0;

  return `M ${_x} ${_y}, ${_x} ${h + _y}, ${w + _x} ${h + _y}, ${
    w + _x
  } ${_y}, ${_x} ${_y}`;
};

export default rectToPath;
