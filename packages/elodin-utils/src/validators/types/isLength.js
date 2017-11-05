import { isDimension, isFunction } from 'bredon-types'

export default function isLength(node) {
  return (
    // all dimensional values are length values
    isDimension(node) ||
    // calc() functions are length values as well
    (isFunction(node) && node.callee.value.indexOf('calc') !== -1)
  )
}
