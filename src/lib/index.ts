import { parse } from './parse';
import circleToPath from './utils/circleToPath';
import rectToPath from './utils/rectToPath';
import polygonToPath from './utils/polygonToPath';
import lineToPath from './utils/lineToPath';

export type { ParseOptions } from './parse';
export type { Icon, IcomoonIcon, SvgPathAttrs, Template } from './types';

export { parse, circleToPath, rectToPath, polygonToPath, lineToPath };

export default parse;
