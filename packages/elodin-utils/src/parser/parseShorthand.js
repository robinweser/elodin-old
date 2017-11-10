/* @flow */
import { parse, generate } from 'bredon'
import { isValidProperty } from 'bredon-validate'

import { isValueList, isValue } from 'bredon-types'

import propertyShorthands from '../data/propertyShorthands'
import arrayReduce from '../arrayReduce'

const circularPattern = [[0, 0, 0, 0], [0, 1, 0, 1], [0, 1, 2, 1], [0, 1, 2, 3]]
const axesPattern = [[0, 0], [0, 1]]

const patternMap = {
  padding: {
    pattern: circularPattern,
    values: propertyShorthands.padding,
  },
  margin: {
    pattern: circularPattern,
    values: propertyShorthands.margin,
  },
  borderRadius: {
    pattern: circularPattern,
    values: propertyShorthands.borderRadius,
  },
  borderWidth: {
    pattern: circularPattern,
    values: propertyShorthands.borderWidth,
  },
  borderStyle: {
    pattern: circularPattern,
    values: propertyShorthands.borderStyle,
  },
  borderColor: {
    pattern: circularPattern,
    values: propertyShorthands.borderColor,
  },
  perspectiveOrigin: {
    pattern: axesPattern,
    values: propertyShorthands.perspectiveOrigin,
  },
}

function parseShorthandValue(property: string, ast: Object) {
  if (isValueList(ast)) {
    if (ast.body.length > 1) {
      // TODO: parse multi values as well
      return {}
    }

    return parseShorthandValue(property, ast.body[0])
  }

  if (isValue(ast)) {
    const valueCount = ast.body.length

    if (patternMap[property]) {
      const { pattern, values } = patternMap[property]
      const matchingPattern = pattern[valueCount - 1]

      return arrayReduce(
        values,
        (longhands, longhandProperty, index) => {
          longhands[longhandProperty] = generate(
            ast.body[matchingPattern[index]]
          )

          return longhands
        },
        {}
      )
    }

    const longhands = [...propertyShorthands[property]]

    return arrayReduce(
      ast.body,
      (spread, node) => {
        const longhand = longhands.find(prop =>
          isValidProperty(prop, generate(node))
        )

        if (longhand) {
          longhands.splice(longhands.indexOf(longhand), 1)
          spread[longhand] = generate(node)
        }

        return spread
      },
      {}
    )
  }

  // TODO: error?
  return {}
}

/* TODO:
  background, font
*/
export default function parseShorthand(
  property: string,
  value: string
): Object {
  if (!propertyShorthands.hasOwnProperty(property)) {
    console.warn(`${property} is not a shorthand property.`)
    return {}
  }

  return parseShorthandValue(property, parse(value))
}
