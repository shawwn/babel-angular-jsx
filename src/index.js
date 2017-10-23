import jsx from "babel-plugin-syntax-jsx";
const babel = require('babel-core')
import { convert } from 'angular-jsx';

export default function ({ types: t }) {
    return {
        inherits: jsx,
        visitor: {
          Program: {
            exit: function(path, state) {
              if (path._done) return;
              const { code: input } = babel.transformFromAst(state.file.ast);
              const output = convert(input);
              const { ast } = babel.transform(output);
              path.replaceWith(ast.program);
              path._done = true;
            }
          },
        }
    };
}
