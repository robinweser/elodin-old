/* @flow */
import { parse } from 'bredon'
import { isCSSValue, isDimension } from 'bredon-types'
import isUnitlessProperty from 'css-in-js-utils/lib/isUnitlessProperty'

import type { PluginInterface } from '../../../types/PluginInterface'

type Options = {
  unitsPerProperty?: { [property: string]: Array<string> },
  units: Array<string>
}

function isSingleValue(ast) {
  return isCSSValue(ast) && ast.body.length === 1
}

function getAllowedUnitsForProperty(property, enforceUnit) {
  const { units = ['px'], unitsPerProperty } = enforceUnit
  return (unitsPerProperty && unitsPerProperty[property]) || units
}

function runRules(
  { style, addWarning }: PluginInterface,
  { units = ['px'], unitPerProperty = {} }: Options
) {
  for (const property in style) {
    const value = style[property]

    if (isUnitlessProperty(property)) {
      continue
    }

    // if the value is a plain javascript number
    if (typeof value === 'number' && enforceUnit && !enforceNumberForPx) {
      const allowedUnits = getAllowedUnitsForProperty(property, enforceUnit)
      // TODO: fix
      const dimension = value + allowedUnits[0]

      addWarning({
        type: 'UNIT_VALUE',
        description: `Do not use plain numbers for "${property}". Use one of "${allowedUnits.join(
          ', '
        )}".`,
        suggestion: dimension,
        property,
        value
      })

      continue
    }

    const ast = parse(value.toString())

    if (isSingleValue(ast)) {
      const node = ast.body[0]

      if (isDimension(node)) {
        if (enforceNumberForPx && node.unit === 'px') {
          // TODO: fix
          addWarning({
            type: 'UNIT_VALUE',
            description: `Do not apply "px" unit to "${value}". Use "${node.value}".`,
            suggestion: node.value,
            property,
            value
          })
        } else if (enforceUnit) {
          const allowedUnits = getAllowedUnitsForProperty(property, enforceUnit)

          if (allowedUnits.indexOf(node.unit) === -1) {
            // TODO: fix
            const dimension = node.value + allowedUnits[0]

            addWarning({
              type: 'UNIT_VALUE',
              description: `Do not use the unit "${node.unit}" for "${property}". Use one of "${allowedUnits.join(
                ', '
              )}".`,
              suggestion: dimension,
              unit: node.unit,
              allowedUnits,
              property,
              value
            })
          }
        }
      }
    }
  }
}

export default function unit(options: Object = {}): Function {
  return (pluginInterface: Object) => runRules(pluginInterface, options)
}
