"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.parse = void 0;
var muninn_1 = require("muninn");
var lodash_1 = __importDefault(require("lodash"));
var icomoon_1 = require("./template/icomoon");
var circleToPath_1 = __importDefault(require("./utils/circleToPath"));
var lineToPath_1 = __importDefault(require("./utils/lineToPath"));
var rectToPath_1 = __importDefault(require("./utils/rectToPath"));
var polygonToPath_1 = __importDefault(require("./utils/polygonToPath"));
var keyToCamelCase_1 = __importDefault(require("./utils/keyToCamelCase"));
// Attributes that need to be converted to numbers
var calcKeys = [
    'cx',
    'cy',
    'r',
    'x',
    'y',
    'width',
    'height',
    'x1',
    'y1',
    'x2',
    'y2',
    'rx',
];
var ignoredSvgAttrs = [
    'class',
    'height',
    'width',
    'viewBox',
    'xmlns',
    'xlink',
    'version',
    'preserveAspectRatio',
];
var parse = function (svg, options) {
    var getPaths = function (el) {
        var tagName = el.get(0).tagName;
        return {
            path: {
                selector: '@ $all',
                transform: function (value) {
                    var calcValue = lodash_1["default"].mapValues(lodash_1["default"].pick(value, calcKeys), function (v) {
                        return Number(v);
                    });
                    if (tagName === 'circle') {
                        value.d = (0, circleToPath_1["default"])(calcValue);
                    }
                    else if (tagName === 'line') {
                        value.d = (0, lineToPath_1["default"])(calcValue);
                    }
                    else if (tagName === 'polygon' || tagName === 'polyline') {
                        value.d = (0, polygonToPath_1["default"])(value.points);
                    }
                    else if (tagName === 'rect') {
                        value.d = (0, rectToPath_1["default"])(calcValue);
                    }
                    if (value['stroke-width']) {
                        value['stroke-width'] = Number(value['stroke-width']);
                    }
                    return (0, keyToCamelCase_1["default"])(lodash_1["default"].omit(value, __spreadArray(__spreadArray([], calcKeys, true), ['points'], false)));
                }
            }
        };
    };
    // @ts-ignore [TODO]: Fix this
    var data = (0, muninn_1.parse)(svg, {
        schema: {
            paths: {
                selector: 'path, polygon, polyline, circle, line, rect | array',
                schema: getPaths
            },
            width: 'svg @ width | number',
            height: 'svg @ height | number',
            viewBox: 'svg @ viewBox',
            svgAttrs: {
                selector: 'svg @ $all',
                transform: function (value) { return (__assign(__assign({}, lodash_1["default"].omit((0, keyToCamelCase_1["default"])(value), ignoredSvgAttrs)), (value['stroke-width']
                    ? { strokeWidth: Number(value['stroke-width']) }
                    : {}))); }
            }
        }
    });
    var icon = {
        width: data.width,
        height: data.height,
        paths: [],
        viewBox: data.viewBox,
        attrs: [],
        svgAttrs: data.svgAttrs
    };
    if (data.viewBox) {
        var _a = data.viewBox.split(' ').map(parseInt), width = _a[2], height = _a[3];
        icon.width = data.width || width;
        icon.height = data.height || height;
    }
    icon.paths = data.paths.map(function (_a) {
        var path = _a.path;
        return path.d;
    });
    icon.attrs = data.paths.map(function (_a) {
        var _b = _a.path, d = _b.d, attr = __rest(_b, ["d"]);
        return attr;
    });
    var isIcomoon = options && options.template === 'icomoon';
    return isIcomoon ? (0, icomoon_1.icomoon)(icon) : icon;
};
exports.parse = parse;
