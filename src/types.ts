export type SvgPathAttrs = {
  clipRule?: string;
  fillRule?: string;
  stroke?: string;
  strokeLinecap?: string;
  strokeLinejoin?: string;
  strokeWidth?: number;
  fill?: string;
};

export type IconAttrs = {
  fill?: string;
  stroke?: string;
};

export type RawIcon = {
  points: string[];
  paths: string[];
  fills: string[];
  width: number;
  height: number;
  viewBox: string;
  attrs: SvgPathAttrs[];
  svgAttrs: IconAttrs;
};

export type Icon = {
  paths: string[];
  fills: string[];
  width: number;
  height: number;
  viewBox: string;
  attrs: SvgPathAttrs[];
  svgAttrs: IconAttrs;
};

export type IcomoonIcon = {
  properties: {
    name: string;
  };
  icon: {
    paths: string[];
    attrs?: Object[];
    width?: number | string;
  };
  [key: string]: any;
};
