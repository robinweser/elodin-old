/* @flow */
import { parse, generate } from 'bredon'
import {
  isMultiValue,
  isCSSValue,
  isDimension,
  isFunction,
  isInteger,
  isString,
  isFloat,
  isIdentifier
} from 'bredon-types'
import { propertyShorthands } from 'elodin-data'

import { isColor, isKeyword, isLength } from '../validators/types'

import arrayReduce from '../arrayReduce'

const circularPattern = [[0, 0, 0, 0], [0, 1, 0, 1], [0, 1, 2, 1], [0, 1, 2, 3]]
const axesPattern = [[0, 0], [0, 1]]

const patternMap = {
  padding: {
    pattern: circularPattern,
    values: propertyShorthands.padding
  },
  margin: {
    pattern: circularPattern,
    values: propertyShorthands.margin
  },
  borderRadius: {
    pattern: circularPattern,
    values: propertyShorthands.borderRadius
  },
  borderWidth: {
    pattern: circularPattern,
    values: propertyShorthands.borderWidth
  },
  borderStyle: {
    pattern: circularPattern,
    values: propertyShorthands.borderStyle
  },
  borderColor: {
    pattern: circularPattern,
    values: propertyShorthands.borderColor
  },
  perspectiveOrigin: {
    pattern: axesPattern,
    values: propertyShorthands.perspectiveOrigin
  }
}

const typeMap = {
  border: {
    borderWidth: isLength,
    borderStyle: isKeyword('borderStyle'),
    borderColor: isColor
  },
  borderTop: {
    borderTopWidth: isLength,
    borderTopStyle: isKeyword('borderTopStyle'),
    borderTopColor: isColor
  },
  borderRight: {
    borderRightWidth: isLength,
    borderRightStyle: isKeyword('borderRightStyle'),
    borderRightColor: isColor
  },
  borderBottom: {
    borderBottomWidth: isLength,
    borderBottomStyle: isKeyword('borderBottomStyle'),
    borderBottomColor: isColor
  },
  borderLeft: {
    borderLeftWidth: isLength,
    borderLeftStyle: isKeyword('borderLeftStyle'),
    borderLeftColor: isColor
  },
  outline: {
    outlineWidth: isLength,
    outlineStyle: isKeyword('outlineStyle'),
    outlineColor: isColor
  },
  columnRule: {
    columnRuleWidth: isLength,
    columnRuleStyle: isKeyword('columnRuleStyle'),
    columnRuleColor: isColor
  },
  columns: {
    columnWidth: isLength,
    columnCount: isInteger
  },
  textDecoration: {
    textDecorationLine: isKeyword('textDecorationLine'),
    textDecorationStyle: isKeyword('textDecorationStyle'),
    textDecorationColor: isColor
  },
  animation: {
    animationDuration: isDimension,
    animationDelay: isDimension,
    animationTimingFunction: node =>
      isKeyword('animationTimingFunction')(node) || isFunction(node),
    animationIterationCount: node =>
      isKeyword('animationIterationCount')(node) || isInteger(node),
    animationDirection: isKeyword('animationDirection'),
    animationFillMode: isKeyword('animationFillMode'),
    animationPlayState: isKeyword('animationPlayState'),
    animationName: isIdentifier
  },
  font: {
    fontStyle: isKeyword('fontStyle'),
    fontVariant: isKeyword('fontVariant'),
    fontWeight: isKeyword('fontWeight'),
    fontSize: node => isKeyword('fontSize')(node) || isLength(node),
    lineHeight: node =>
      isKeyword('lineHeight')(node) ||
      isLength(node) ||
      isFloat(node) ||
      isInteger(node),
    fontFamily: node =>
      isKeyword('fontFamily')(node) || isString(node) || isIdentifier(node)
  }
}

/* TODO:
  background, transition
*/
export default function parseShorthand(
  property: string,
  value: string
): ?Object {
  const ast = parse(value)

  if (isMultiValue(ast)) {
    // TODO: parse multi values as well
    return {}
  }
  // ensure we're using single values
  if (isCSSValue(ast)) {
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

    if (typeMap[property]) {
      const types = { ...typeMap[property] }

      return arrayReduce(
        ast.body,
        (longhands, node) => {
          let longhandProperty

          for (const longhand in types) {
            if (types[longhand](node)) {
              longhandProperty = longhand
              delete types[longhand]
              break
            }
          }

          if (longhandProperty) {
            longhands[longhandProperty] = generate(node)
          }

          return longhands
        },
        {}
      )
    }
  }

  // TODO: error?
  return {}
}
