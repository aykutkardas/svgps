"use strict";
exports.__esModule = true;
var circleToPath = function (_a) {
    var cx = _a.cx, cy = _a.cy, r = _a.r;
    var _cx = cx || 0;
    var _cy = cy || 0;
    var _r = r || 0;
    return "M ".concat(_cx, " ").concat(_cy, " m -").concat(_r, ", 0a ").concat(_r, " ").concat(_r, " 0 1 0 ").concat(r * 2, " 0a ").concat(_r, " ").concat(_r, " 0 1 0 -").concat(r * 2, " 0");
};
exports["default"] = circleToPath;
