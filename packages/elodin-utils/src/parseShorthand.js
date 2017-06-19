/* @flow */
import { parse, generate } from 'bredon'
import {
  isCSSValue,
  isHexColor,
  isDimension,
  isFunction,
  isInteger,
  isIdentifier
} from 'bredon-types'

import valueKeywords from './data/valueKeywords'
import arrayReduce from './arrayReduce'

function isLength(node) {
  return (
    isDimension(node) ||
    (isFunction(node) && node.callee.value.indexOf('calc') !== -1)
  )
}

function isColor(node) {
  return (
    isHexColor(node) ||
    (isFunction(node) && node.callee.value.match(/^(rgba?|hsla?)$/) !== null) ||
    isIdentifierAndMatchKeyword(node, 'color')
  )
}

function isIdentifierAndMatchKeyword(node, property) {
  return (
    isIdentifier(node) && valueKeywords[property].indexOf(node.value) !== -1
  )
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
    values: [
      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth'
    ]
  },
  borderStyle: {
    pattern: circularPattern,
    values: [
      'borderTopStyle',
      'borderRightStyle',
      'borderBottomStyle',
      'borderLeftStyle'
    ]
  },
  borderColor: {
    pattern: circularPattern,
    values: [
      'borderTopStyle',
      'borderRightStyle',
      'borderBottomStyle',
      'borderLeftStyle'
    ]
  },
  perspectiveOrigin: {
    pattern: axesPattern,
    values: ['perspectiveOriginX', 'perspectiveOriginY']
  }
}

const typeMap = {
  border: {
    borderWidth: isLength,
    borderStyle: node => isIdentifierAndMatchKeyword(node, 'borderStyle'),
    borderColor: isColor
  },
  borderTop: {
    borderTopWidth: isLength,
    borderTopStyle: node => isIdentifierAndMatchKeyword(node, 'borderTopStyle'),
    borderTopColor: isColor
  },
  borderRight: {
    borderRightWidth: isLength,
    borderRightStyle: node =>
      isIdentifierAndMatchKeyword(node, 'borderRightStyle'),
    borderRightColor: isColor
  },
  borderBottom: {
    borderBottomWidth: isLength,
    borderBottomStyle: node =>
      isIdentifierAndMatchKeyword(node, 'borderBottomStyle'),
    borderBottomColor: isColor
  },
  borderLeft: {
    borderLeftWidth: isLength,
    borderLeftStyle: node =>
      isIdentifierAndMatchKeyword(node, 'borderLeftStyle'),
    borderLeftColor: isColor
  },
  outline: {
    outlineWidth: isLength,
    outlineStyle: node => isIdentifierAndMatchKeyword(node, 'outlineStyle'),
    outlineColor: isColor
  },
  columnRule: {
    columnRuleWidth: isLength,
    columnRuleStyle: node =>
      isIdentifierAndMatchKeyword(node, 'columnRuleStyle'),
    columnRuleColor: isColor
  },
  columns: {
    columnWidth: isLength,
    columnCount: isInteger
  },
  textDecoration: {
    textDecorationLine: node =>
      isIdentifierAndMatchKeyword(node, 'textDecorationLine'),
    textDecorationStyle: node =>
      isIdentifierAndMatchKeyword(node, 'textDecorationStyle'),
    textDecorationColor: isColor
  },
  animation: {
    animationDuration: isDimension,
    animationDelay: isDimension,
    animationTimingFunction: node =>
      isIdentifierAndMatchKeyword(node, 'animationTimingFunction') ||
      isFunction(node),
    animationIterationCount: node =>
      isIdentifierAndMatchKeyword(node, 'animationIterationCount') ||
      isInteger(node),
    animationDirection: node =>
      isIdentifierAndMatchKeyword(node, 'animationDirection'),
    animationFillMode: node =>
      isIdentifierAndMatchKeyword(node, 'animationFillMode'),
    animationPlayState: node =>
      isIdentifierAndMatchKeyword(node, 'animationPlayState'),
    animationName: isIdentifier
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

  // ensure we're using single values
  if (isCSSValue) {
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
