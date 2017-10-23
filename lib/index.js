'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;

  return {
    inherits: _babelPluginSyntaxJsx2.default,
    visitor: {
      Program: {
        exit: function exit(path, state) {
          if (path._done) return;

          var _babel$transformFromA = babel.transformFromAst(state.file.ast),
              input = _babel$transformFromA.code;

          var output = (0, _angularJsx.convert)(input);

          var _babel$transform = babel.transform(output),
              ast = _babel$transform.ast;

          path.replaceWith(ast.program);
          path._done = true;
        }
      }
    }
  };
};

var _babelPluginSyntaxJsx = require('babel-plugin-syntax-jsx');

var _babelPluginSyntaxJsx2 = _interopRequireDefault(_babelPluginSyntaxJsx);

var _angularJsx = require('angular-jsx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babel = require('babel-core');