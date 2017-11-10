/* @flow */
import { generate } from 'bredon'

import objectReduce from './objectReduce'

export default function generateStyle(ast: Object): Object {
  return objectReduce(
    ast,
    (style, value, property) => {
      style[property] = generate(value)
      return style
    },
    {}
  )
}
