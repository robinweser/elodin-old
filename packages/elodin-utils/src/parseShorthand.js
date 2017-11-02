/* @flow */
import { parse, generate } from 'bredon'
import {
  isCSSValue,
  isHexColor,
  isDimension,
  isFunction,
  isInteger,
  isString,
  isFloat,
  isIdentifier
} from 'bredon-types'

import valueKeywords from './data/valueKeywords'
import arrayReduce from './arrayReduce'

function isLength(node) {
  return isDimension(node) || (isFunction(node) && node.callee.value.indexOf('calc') !== -1)
}

function isColor(node) {
  return (
    isHexColor(node) ||
    (isFunction(node) && node.callee.value.match(/^(rgba?|hsla?)$/) !== null) ||
    isIdentifierAndMatchesKeyword(node, 'color')
  )
}

function isIdentifierAndMatchesKeyword(node, property) {
  return isIdentifier(node) && valueKeywords[property].indexOf(node.value) !== -1
}

const circularPattern = [[0, 0, 0, 0], [0, 1, 0, 1], [0, 1, 2, 1], [0, 1, 2, 3]]
const axesPattern = [[0, 0], [0, 1]]

const patternMap = {
  padding: {
    pattern: circularPattern,
    values: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']
  },
  margin: {
    pattern: circularPattern,
    values: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']
  },
  borderRadius: {
    pattern: circularPattern,
    values: [
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomRightRadius',
      'borderBottomLeftRadius'
    ]
  },
  borderWidth: {
    pattern: circularPattern,
    values: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth']
  },
  borderStyle: {
    pattern: circularPattern,
    values: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle']
  },
  borderColor: {
    pattern: circularPattern,
    values: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle']
  },
  perspectiveOrigin: {
    pattern: axesPattern,
    values: ['perspectiveOriginX', 'perspectiveOriginY']
  }
}

const typeMap = {
  border: {
    borderWidth: isLength,
    borderStyle: node => isIdentifierAndMatchesKeyword(node, 'borderStyle'),
    borderColor: isColor
  },
  borderTop: {
    borderTopWidth: isLength,
    borderTopStyle: node => isIdentifierAndMatchesKeyword(node, 'borderTopStyle'),
    borderTopColor: isColor
  },
  borderRight: {
    borderRightWidth: isLength,
    borderRightStyle: node => isIdentifierAndMatchesKeyword(node, 'borderRightStyle'),
    borderRightColor: isColor
  },
  borderBottom: {
    borderBottomWidth: isLength,
    borderBottomStyle: node => isIdentifierAndMatchesKeyword(node, 'borderBottomStyle'),
    borderBottomColor: isColor
  },
  borderLeft: {
    borderLeftWidth: isLength,
    borderLeftStyle: node => isIdentifierAndMatchesKeyword(node, 'borderLeftStyle'),
    borderLeftColor: isColor
  },
  outline: {
    outlineWidth: isLength,
    outlineStyle: node => isIdentifierAndMatchesKeyword(node, 'outlineStyle'),
    outlineColor: isColor
  },
  columnRule: {
    columnRuleWidth: isLength,
    columnRuleStyle: node => isIdentifierAndMatchesKeyword(node, 'columnRuleStyle'),
    columnRuleColor: isColor
  },
  columns: {
    columnWidth: isLength,
    columnCount: isInteger
  },
  textDecoration: {
    textDecorationLine: node => isIdentifierAndMatchesKeyword(node, 'textDecorationLine'),
    textDecorationStyle: node => isIdentifierAndMatchesKeyword(node, 'textDecorationStyle'),
    textDecorationColor: isColor
  },
  animation: {
    animationDuration: isDimension,
    animationDelay: isDimension,
    animationTimingFunction: node =>
      isIdentifierAndMatchesKeyword(node, 'animationTimingFunction') || isFunction(node),
    animationIterationCount: node =>
      isIdentifierAndMatchesKeyword(node, 'animationIterationCount') || isInteger(node),
    animationDirection: node => isIdentifierAndMatchesKeyword(node, 'animationDirection'),
    animationFillMode: node => isIdentifierAndMatchesKeyword(node, 'animationFillMode'),
    animationPlayState: node => isIdentifierAndMatchesKeyword(node, 'animationPlayState'),
    animationName: isIdentifier
  },
  font: {
    fontStyle: node => isIdentifierAndMatchesKeyword(node, 'fontStyle'),
    fontVariant: node => isIdentifierAndMatchesKeyword(node, 'fontVariant'),
    fontWeight: node => isIdentifierAndMatchesKeyword(node, 'fontWeight'),
    fontSize: node => isIdentifierAndMatchesKeyword(node, 'fontSize') || isLength(node),
    lineHeight: node =>
      isIdentifierAndMatchesKeyword(node, 'lineHeight') ||
      isLength(node) ||
      isFloat(node) ||
      isInteger(node),
    fontFamily: node =>
      isIdentifierAndMatchesKeyword(node, 'fontFamily') || isString(node) || isIdentifier(node)
  }
}

/* TODO:
  background, transition, font
*/

export default function parseShorthand(property: string, value: string): ?Object {
  const ast = parse(value)

  // ensure we're using single values
  if (isCSSValue(ast)) {
    const valueCount = ast.body.length

    if (patternMap[property]) {
      const { pattern, values } = patternMap[property]
      const matchingPattern = pattern[valueCount - 1]

      return arrayReduce(
        values,
        (longhands, longhandProperty, index) => {
          longhands[longhandProperty] = generate(ast.body[matchingPattern[index]])
          return longhands
        },
        {}
      )
    }

    if (typeMap[property]) {
      const types = { ...typeMap[property] }

      return arrayReduce(
        ast.body,
        (longhands, value) => {
          let longhandProperty

          for (const longhand in types) {
            if (types[longhand](value)) {
              longhandProperty = longhand
              delete types[longhand]
              break
            }
          }

          if (longhandProperty) {
            longhands[longhandProperty] = generate(value)
          }

          return longhands
        },
        {}
      )
    }
  }
}
