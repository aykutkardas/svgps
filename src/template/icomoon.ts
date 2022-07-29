import * as svgpath from "svgpath";
import * as uniq from "lodash.uniq";

import { IcomoonIcon, Icon, SvgPathAttrs } from "../types";

const clearEmptyAttr = (attr: SvgPathAttrs): SvgPathAttrs => {
  const newAttr = { ...attr };

  Object.keys(newAttr).forEach((key) => {
    if (newAttr[key] !== null) return;
    delete newAttr[key];
  });

  return newAttr;
};

const scaleStrokeWidth = (attr: SvgPathAttrs, scale: number): SvgPathAttrs => {
  const newAttr = { ...attr };

  if (typeof newAttr.strokeWidth === "number") {
    newAttr.strokeWidth = newAttr.strokeWidth * scale;
  }

  return newAttr;
};

export const icomoon = (icon: Icon): IcomoonIcon => {
  const scale = 1024 / icon.width;

  const fills = uniq(icon.fills).length === 1 ? [] : icon.fills;

  const svgAttrs = clearEmptyAttr(icon.svgAttrs);

  Object.keys(svgAttrs).forEach((key) => {
    icon.attrs = icon.attrs.map((attr, index) => {
      const currentFill = icon.fills[index];
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
    uniq(icon.attrs.map(({ stroke }) => stroke)).length === 1;

  const attrs =
    icon.attrs.map(clearEmptyAttr).map((attr) => {
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

  const paths = icon.paths.map((path) => svgpath(path).scale(scale).toString());
  const width = Math.round(Math.max(icon.height, icon.width) * scale);

  return {
    icon: {
      paths,
      attrs,
      width,
    },
    properties: {
      name: "",
    },
  };
};
