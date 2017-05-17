/* @flow */
import { parse } from 'bredon'

export default function getStyleAST(style: Object): Object {
  return Object.keys(style).reduce((collection, property) => {
    collection[property] = parse(style[property].toString()).toAST()
    return collection
  }, {})
}
