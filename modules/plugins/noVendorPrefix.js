/* @flow */
import unprefixProperty from 'css-in-js-utils/lib/unprefixProperty'
import unprefixValue from 'css-in-js-utils/lib/unprefixValue'
import isPrefixedProperty from 'css-in-js-utils/lib/isPrefixedProperty'
import isPrefixedValue from 'css-in-js-utils/lib/isPrefixedValue'
import camelCaseProperty from 'css-in-js-utils/lib/camelCaseProperty'

import objectEach from '../utils/objectEach'

import type PluginInterface from '../../types/PluginInterface'

export function noVendorPrefix({ style, addWarning }: PluginInterface): void {
  objectEach(style, (value, property) => {
    const camelCasedProperty = camelCaseProperty(property)

    if (isPrefixedProperty(camelCasedProperty)) {
      const unprefixedProperty = unprefixProperty(camelCasedProperty)

      addWarning({
        type: 'NO_VENDOR_PREFIX',
        description: `The property "${property}" should not be vendor prefixed. Use "${unprefixedProperty}" instead.`
        suggestion: unprefixedProperty,
        property,
        value
      })
    }

    if (typeof value === 'string' && isPrefixedValue(value)) {
      const unprefixedValue = unprefixValue(value)

      warnings.push({
        type: this.getType(),
        hint: `The value "${value}" shoul not be vendor prefixes. Use "${suggestion}" instead.`
        suggestion: unprefixedValue,
        property,
        value
      })
    }

  })
}

export default () => noShorthand


export default {
  getType() {
    return 'NO_VENDOR_PREFIX'
  },
  getPropertyHint(property, suggestion) {
    return `Property "${property}" does not need vendor prefixes. Use "${suggestion}" instead.`
  },
  getValueHint(value, suggestion) {
    return `Value "${value}" does not need vendor prefixes. Use "${suggestion}" instead.`
  },
  run(style, meta, warnings) {
    for (const property in style) {
      const camelCasedProperty = dashToCamelCase(property)
      const value = style[property]

      if (isPrefixedProperty(camelCasedProperty)) {
        const unprefixedProperty = unprefixProperty(camelCasedProperty)

        warnings.push({
          type: this.getType(),
          hint: this.getPropertyHint(property, unprefixedProperty),
          suggestion: unprefixedProperty,
          property,
          value
        })
      }

      if (typeof value === 'string' && isPrefixedValue(value)) {
        const unprefixedValue = unprefixValue(value)

        warnings.push({
          type: this.getType(),
          hint: this.getValueHint(value, unprefixedValue),
          suggestion: unprefixedValue,
          property,
          value
        })
      }
    }
  }
}
