const { parse } = require("muninn");

function parseSVG(svg) {
  return parse(svg, {
    schema: {
      paths: "path@d | array",
      fills: "path@fill | array",
    },
  });
}

module.exports = parseSVG;
