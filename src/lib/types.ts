export type SvgPathAttrs = {
  clipRule?: string;
  fillRule?: string;
  stroke?: string;
  strokeLinecap?: string;
  strokeLinejoin?: string;
  strokeWidth?: number;
  fill?: string;
  d?: string;
};

export type RawIcon = {
  paths: { path: SvgPathAttrs }[];
  fills: string[];
  width: number;
  height: number;
  viewBox: string;
  attrs: SvgPathAttrs[];
  svgAttrs: SvgPathAttrs;
};

export type Icon = {
  paths: string[];
  width: number;
  height: number;
  viewBox: string;
  attrs: SvgPathAttrs[];
  svgAttrs: SvgPathAttrs;
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

export type Template = 'icomoon';
