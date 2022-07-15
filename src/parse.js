const { parse } = require("muninn");

function parseSVG(svg) {
  const getPolygonPoints = (point) => {
    if (!point) return null;

    return point.startsWith("M") ? point : "M" + point;
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
      attrs: {
        selector: "path | array",
        schema: {
          clipRule: "@ clip-rule",
          fillRule: "@ fill-rule",
          stroke: "@ stroke",
          strokeLinecap: "@ stroke-linecap",
          strokeLinejoin: "@ stroke-linejoin",
          strokeWidth: {
            selector: " @ stroke-width | number",
            transform: function (val) {
              return Number.isNaN(val) ? null : val;
            },
          },
        },
      },
      svgAttrs: {
        selector: "svg",
        schema: {
          fill: "@ fill",
          stroke: "@ stroke",
        },
      },
    },
  });

  if (data.viewBox) {
    const [, , width, height] = data.viewBox.split(" ");

    data.width = data.width || parseInt(width);
    data.height = data.height || parseInt(height);
  }

  if (Array.isArray(data.points)) {
    data.points.forEach((point) => data.paths.unshift(point));
  }

  delete data.points;

  return data;
}

module.exports = parseSVG;
