/* @flow */
import { getSingleValue, wrap } from 'bredon-tools'
import isUnitlessProperty from 'css-in-js-utils/lib/isUnitlessProperty'

import type { PluginInterface } from '../../../flowtypes/PluginInterface'

const PLUGIN_TYPE = 'UNIT'

type Options = {
  unitsPerProperty?: { [property: string]: Array<string> },
  defaultUnit?: string,
  units: Array<string>,
}

function removeDuplicate(arr) {
  return arr.filter((element, index) => arr.indexOf(element) === index)
}

function getPreferedUnits(property, { units, defaultUnit, unitsPerProperty }) {
  if (unitsPerProperty.hasOwnProperty(property)) {
    return unitsPerProperty[property]
  }

  return removeDuplicate([defaultUnit, ...units])
}

function unit(
  { style, fix, bredon, addWarning }: PluginInterface,
  options: Options
) {
  const { defaultUnit = 'px', units = [], unitsPerProperty = {} } = options

  for (const property in style) {
    // is the property is unitless we don't add units
    if (isUnitlessProperty(property)) {
      continue
    }

    const ast = style[property]
    const node = getSingleValue(ast)

    // if the value is a plain number
    if (node) {
      if (bredon.isInteger(node) || bredon.isFloat(node)) {
        const preferedUnits = getPreferedUnits(property, {
          units,
          unitsPerProperty,
          defaultUnit,
        })

        const newNode = bredon.dimension(node, preferedUnits[0])

        if (fix) {
          wrap(ast.body[0]).replaceChildNode(node, newNode)
        } else {
          addWarning({
            type: PLUGIN_TYPE,
            description: `Do not use plain numbers for "${
              property
            }". Use one of "${preferedUnits.join(', ')}".`,
            suggestion: bredon.generate(newNode),
            property,
            value: bredon.generate(ast),
          })
        }
      } else if (bredon.isDimension(node)) {
        const preferedUnits = getPreferedUnits(property, {
          units,
          unitsPerProperty,
          defaultUnit,
        })

        if (preferedUnits.indexOf(node.unit) === -1) {
          const newNode = bredon.dimension(node.value, preferedUnits[0])

          if (fix) {
            wrap(ast.body[0]).replaceChildNode(node, newNode)
          } else {
            addWarning({
              type: PLUGIN_TYPE,
              description: `Do not use the unit "${node.unit}" for "${
                property
              }". Use one of "${preferedUnits.join(', ')}".`,
              suggestion: bredon.generate(newNode),

              property,
              value: bredon.generate(ast),
            })
          }
        }
      }
    }
  }
}

export default (options: Options) => (pluginInterface: PluginInterface) =>
  unit(pluginInterface, options)
