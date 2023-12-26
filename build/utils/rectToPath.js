"use strict";
exports.__esModule = true;
// [TODO]: Add `rx` support
var rectToPath = function (_a) {
    var x = _a.x, y = _a.y, w = _a.width, h = _a.height, _b = _a.rx, rx = _b === void 0 ? 0 : _b;
    var _x = x || 0;
    var _y = y || 0;
    return "M ".concat(_x, " ").concat(_y, ", ").concat(_x, " ").concat(h + _y, ", ").concat(w + _x, " ").concat(h + _y, ", ").concat(w + _x, " ").concat(_y, ", ").concat(_x, " ").concat(_y);
};
exports["default"] = rectToPath;
