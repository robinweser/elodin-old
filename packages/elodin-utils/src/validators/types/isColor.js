import { isHexColor, isFunction } from 'bredon-types'

import isKeyword from './isKeyword'

const COLOR_REGEX = /^(rgba?|hsla?)$/

export default function isColor(node) {
  return (
    // matches hex color values
    isHexColor(node) ||
    // matches rgb, rgba, hsl, hsla color functions
    (isFunction(node) && node.callee.value.match(COLOR_REGEX) !== null) ||
    // matches any color keyword
    isKeyword('color')(node)
  )
}
