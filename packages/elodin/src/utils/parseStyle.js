/* @flow */
import { parse } from 'bredon'

import objectReduce from './objectReduce'

export default function parseStyle(style: Object): Object {
  return objectReduce(
    style,
    (ast, value, property) => {
      ast[property] = parse(value.toString())
      return ast
    },
    {}
  )
}
