/* @flow */
import objectEach from '../utils/objectEach'

import type PluginInterface from '../../types/PluginInterface'

export function preferNumber({
  style,
  AST,
  autoFix,
  addWarning
}: PluginInterface): void {
  objectEach(style, (value, property) => {
    const valueAST = AST[property].body

    if (valueAST.length === 1 && typeof value === 'string') {
      const valueType = valueAST[0].type

      let pureNumber
      if (
        (valueType === 'Dimension' && valueAST[0].unit === 'px') ||
        valueType === 'Integer'
      ) {
        pureNumber = valueAST[0].value
      } else if (valueType === 'Float') {
        pureNumber = parseFloat(
          `${valueAST[0].integer}.${valueAST[0].fractional}`
        )
      }

      if (pureNumber) {
        if (autoFix) {
          style[property] = pureNumber
          return
        }

        addWarning({
          type: 'PREFER_NUMBER',
          description: `Prefer pure numbers for "${value}". Use "${pureNumber}" instead.`,
          suggestion: pureNumber,
          property,
          value
        })
      }
    }
  })
}

export default () => preferNumber
