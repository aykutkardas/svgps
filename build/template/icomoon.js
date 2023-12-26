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
exports.__esModule = true;
exports.icomoon = void 0;
var svgpath = require('svgpath');
var _ = require('lodash');
var scaleStrokeWidth = function (attr, scale) {
    var newAttr = __assign({}, attr);
    if (newAttr.strokeWidth) {
        newAttr.strokeWidth = newAttr.strokeWidth * scale;
    }
    return newAttr;
};
var icomoon = function (icon) {
    var _a = icon.viewBox.split(' ').map(Number), viewBoxWidth = _a[2], viewBoxHeight = _a[3];
    var scale = 1024 / Math.max(viewBoxWidth, viewBoxHeight);
    var paths = icon.paths.map(function (path) {
        return svgpath(path).scale(scale).round(1).toString();
    });
    icon.attrs = icon.attrs.map(function (attr) {
        return scaleStrokeWidth(__assign(__assign({}, icon.svgAttrs), attr), scale);
    });
    var attrs = icon.attrs;
    var width = Math.round(Math.max(viewBoxWidth) * scale);
    var uniqueStrokes = _.uniq(attrs.map(function (_a) {
        var stroke = _a.stroke;
        return stroke;
    }));
    var hasNoneStroke = uniqueStrokes.includes('none');
    if (uniqueStrokes.length === 1 && !hasNoneStroke) {
        attrs.forEach(function (attr) { return delete attr.stroke; });
    }
    return {
        icon: {
            paths: paths,
            attrs: attrs,
            width: width
        },
        properties: {
            name: ''
        }
    };
};
exports.icomoon = icomoon;
