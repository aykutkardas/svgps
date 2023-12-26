"use strict";
exports.__esModule = true;
var polygonToPath = function (point) {
    return (point === null || point === void 0 ? void 0 : point.startsWith('M')) ? point : 'M' + point;
};
exports["default"] = polygonToPath;
