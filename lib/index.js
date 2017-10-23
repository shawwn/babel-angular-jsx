'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var t = _ref.types;

    return {
        inherits: jsx,
        post: function post(file) {
            Object.assign(file, babel.transform((0, _angularJsx.convert)(file.code)));
        }
    };
};

var _angularJsx = require('angular-jsx');

var jsx = require("babel-plugin-syntax-jsx");
var babel = require('babel-core');