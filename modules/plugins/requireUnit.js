/* @flow */
import isUnitlessProperty from 'css-in-js-utils/lib/isUnitlessProperty'

import objectEach from '../utils/objectEach'

import type PluginInterface from '../../types/PluginInterface'

export function requireUnit(
  { style, addWarning, autoFix }: PluginInterface,
  unit: string
): void {
  objectEach(style, (value, property) => {
    if (isUnitlessProperty(property) && typeof value === 'number') {
      const dimension = value + unit

      if (autoFix) {
        style[property] = dimension
        return
      }

      addWarning({
        type: 'REQUIRE_UNIT',
        description: `Do not use plain numbers for "${property}". Prefer explicit units e.g. "${dimension}" instead.`,
        property,
        value,
        suggestion: dimension
      })
    }
  })
}

export default (options: Object = {}) => (pluginInterface: PluginInterface) =>
  requireUnit(pluginInterface, options.unit || 'px')
