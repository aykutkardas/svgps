const polygonToPath = (point?: string) =>
  point?.startsWith('M') ? point : 'M' + point;

export default polygonToPath;
