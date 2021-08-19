const { parse } = require("muninn");

function parseSVG(svg) {
  const data = parse(svg, {
    schema: {
      points: {
        selector: "polygon @ points | array",
        custom: function (val) {
          if (val) {
            return val.startsWith("M") ? val : "M" + val;
          }

          return val;
        },
      },
      paths: "path @ d | array",
      fills: "polygon, path @ fill | array",
      width: "svg @ width | number",
      height: "svg @ height | number",
      viewBox: "svg @ viewBox",
    },
  });

  data.points.forEach((point) => {
    data.paths.unshift(point);
  });

  delete data.points;

  return data;
}

module.exports = parseSVG;
