const { parse } = require("muninn");

function parseSVG(svg) {
  const getPolygonPoints = (point) => {
    if (point) {
      return point.startsWith("M") ? point : "M" + point;
    }

    return point;
  };

  const data = parse(svg, {
    schema: {
      points: {
        selector: "polygon @ points | array",
        transform: getPolygonPoints,
      },
      paths: "path @ d | array",
      fills: "polygon, path @ fill | array",
      width: "svg @ width | number",
      height: "svg @ height | number",
      viewBox: "svg @ viewBox",
    },
  });

  if (data.viewBox) {
    const [, , width, height] = data.viewBox.split(" ");

    data.width = data.width || parseInt(width);
    data.height = data.height || parseInt(height);
  }

  data.points.forEach((point) => data.paths.unshift(point));

  delete data.points;

  return data;
}

module.exports = parseSVG;
