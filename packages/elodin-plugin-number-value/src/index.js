/* @flow */
import { parse } from 'bredon'
import { isCSSValue, isDimension } from 'bredon-types'
import { objectEach } from 'elodin-utils'
import isUnitlessProperty from 'css-in-js-utils/lib/isUnitlessProperty'

import type { PluginInterface } from '../../../flowtypes/PluginInterface'

function enforceNumber({ style, addWarning, fix }: PluginInterface) {
  objectEach(style, (value, property) => {
    if (!isUnitlessProperty(property)) {
      const ast = parse(value.toString())

      if (isCSSValue(ast) && ast.body.length === 1) {
        const node = ast.body[0]

        if (isDimension(node) && node.unit === 'px') {
          if (fix) {
            style[property] = node.value
          } else {
            addWarning({
              type: 'NUMBER_VALUE',
              description: `Do not apply "px" unit to "${value}". Use "${
                node.value
              }".`,
              suggestion: node.value,
              property,
              value,
            })
          }
        }
      }
    }
  })
}

export default () => enforceNumber
