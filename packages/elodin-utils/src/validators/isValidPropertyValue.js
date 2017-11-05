/* @flow */
import { isMultiValue, isCSSValue } from 'bredon-types'

import isMultiValueProperty from './isMultiValueProperty'
import isValueSetProperty from './isValueSetProperty'

import arrayReduce from '../arrayReduce'

export default function isValidPropertyValue(
  property: string,
  ast: any,
  validator: Function
): boolean {
  if (isMultiValue(ast)) {
    if (!isMultiValueProperty(property)) {
      // TODO: invalid warning
      return false
    }

    return arrayReduce(
      ast.body,
      // the property is invalid as soon as one value is invalid
      // TODO: do not regenerate the value
      (isValid, cssValue) => isValid && isValidPropertyValue(cssValue),
      true
    )
  }

  if (isCSSValue(ast)) {
    const valueCount = ast.body.length

    if (valueCount > 1) {
      if (!isValueSetProperty(property)) {
        // TODO: invalid warning
        return false
      }

      return arrayReduce(
        ast.body,
        // the property is invalid as soon as one value is invalid
        // TODO: do not regenerate the value
        (isValid, singleValue) => isValid && isValidPropertyValue(singleValue),
        true
      )
    }

    return validator(ast.body[0])
  }

  // TODO: true or false?
  return true
}
