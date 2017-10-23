var jsx = require("babel-plugin-syntax-jsx");
const babel = require('babel-core');
import { convert } from 'angular-jsx';

export default function ({ types: t }) {
    return {
        inherits: jsx,
        post(file) {
          Object.assign(file, babel.transform(convert(file.code)))
        }
    }
}
