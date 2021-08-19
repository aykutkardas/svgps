const { parse } = require("muninn");

function parseSVG(svg) {
  return parse(svg, {
    schema: {
      paths: "path@d | array",
      fills: "path@fill | array",
      width: "svg@width | number",
      height: "svg@height | number",
      viewBox: "svg@viewBox",
    },
  });
}

module.exports = parseSVG;
