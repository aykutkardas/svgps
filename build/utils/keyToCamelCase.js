"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var lodash_1 = __importDefault(require("lodash"));
var keyToCamelCase = function (data) {
    return lodash_1["default"].mapKeys(data, function (value, key) { return lodash_1["default"].camelCase(key); });
};
exports["default"] = keyToCamelCase;
