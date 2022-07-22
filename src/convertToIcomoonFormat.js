const svgpath = require("svgpath");
const uniq = require("lodash.uniq");

function clearEmptyAttr(attr) {
  Object.keys(attr).forEach((key) => {
    if (attr[key] === null) {
      delete attr[key];
    }
  });

  return attr;
}

function scaleStrokeWidth(attr, scale) {
  const newAttr = { ...attr };

  if (typeof newAttr.strokeWidth === "number") {
    newAttr.strokeWidth = newAttr.strokeWidth * scale;
  }

  return newAttr;
}

const convertToIcomoonFormat = (iconData) => {
  if (!iconData.paths) return iconData;

  const scale = 1024 / iconData.width;

  const fills = uniq(iconData.fills).length === 1 ? [] : iconData.fills;

  const svgAttrs = clearEmptyAttr(iconData.svgAttrs);

  Object.keys(svgAttrs).forEach((key) => {
    iconData.attrs = iconData.attrs.map((attr, index) => {
      const currentFill = iconData.fills[index];
      const newAttr = {
        ...attr,
        [key]: svgAttrs[key],
      };

      if (currentFill && key === "fill" && svgAttrs[key] === "none") {
        if (fills.length) {
          newAttr.fill = currentFill;
        } else {
          delete newAttr.fill;
        }
      }

      return newAttr;
    });
  });

  const isSingleStrokeColor =
    uniq(iconData.attrs.map(({ stroke }) => stroke)).length === 1;

  const attrs =
    iconData.attrs.map(clearEmptyAttr).map((attr) => {
      const newAttr = scaleStrokeWidth(attr, scale);

      if (isSingleStrokeColor) delete newAttr.stroke;

      return newAttr;
    }) || [];

  fills.forEach((fill, index) => {
    if (attrs[index]) {
      attrs[index] = {
        ...attrs[index],
        fill,
      };
    }
  });

  return {
    icon: {
      paths: iconData.paths.map((path) =>
        svgpath(path).scale(scale).toString()
      ),
      attrs,
      width: Math.round(
        (iconData.height > iconData.width ? iconData.height : iconData.width) *
          scale
      ),
    },
    properties: {},
  };
};

module.exports = convertToIcomoonFormat;
