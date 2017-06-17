/* @flow */
import { parse } from 'bredon'

import objectReduce from './objectReduce'

export default function getStyleAST(style: Object): Object {
  return objectReduce(
    style,
    (ast, value, property) => {
      ast[property] = parse(value.toString()).toAST()
      return ast
    },
    {}
  )
}
