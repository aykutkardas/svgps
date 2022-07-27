import { IcomoonIcon, Icon, RawIcon, Template } from "./types";

import { parse as muninnParse } from "muninn";

import { icomoon } from "./template/icomoon";

const getPolygonPoints = (point?: string) =>
  point?.startsWith("M") ? point : "M" + point;

interface ParseOptions {
  template?: Template;
}

export const parse = (
  svg: string,
  options?: ParseOptions
): IcomoonIcon | Icon => {
  // @ts-ignore [TODO]: Fix this
  const data: RawIcon = muninnParse(svg, {
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
    const [, , width, height] = data.viewBox.split(" ").map(parseInt);

    data.width = data.width || width;
    data.height = data.height || height;
  }

  if (Array.isArray(data.points)) {
    data.points.forEach((point) => data.paths.unshift(point));
  }

  delete data.points;

  const isIcomoon = options && options.template === "icomoon";

  return isIcomoon ? icomoon(data) : data;
};
