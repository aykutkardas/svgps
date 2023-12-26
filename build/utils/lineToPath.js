"use strict";
exports.__esModule = true;
var lineToPath = function (_a) {
    var x1 = _a.x1, y1 = _a.y1, x2 = _a.x2, y2 = _a.y2;
    return "M ".concat(x1, " ").concat(y1, ", ").concat(x2, " ").concat(y2);
};
exports["default"] = lineToPath;
