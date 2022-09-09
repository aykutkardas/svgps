// [TODO]: Add `rx` support
const rectToPath = (x, y, width, height, rx = 0) =>
  `M ${x} ${y}, ${x} ${width}, ${width} ${height}, ${height} ${y}`;

export default rectToPath;
