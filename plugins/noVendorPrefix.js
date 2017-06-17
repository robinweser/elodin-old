/* @flow */
import unprefixProperty from 'css-in-js-utils/lib/unprefixProperty'
import unprefixValue from 'css-in-js-utils/lib/unprefixValue'
import isPrefixedProperty from 'css-in-js-utils/lib/isPrefixedProperty'
import isPrefixedValue from 'css-in-js-utils/lib/isPrefixedValue'
import camelCaseProperty from 'css-in-js-utils/lib/camelCaseProperty'

import objectEach from '../utils/objectEach'

import type PluginInterface from '../../types/PluginInterface'

export default function noVendorPrefix({
  style,
  addWarning,
  autoFix
}: PluginInterface): void {
  objectEach(style, (value, property) => {
    const camelCasedProperty = camelCaseProperty(property)

    if (typeof value === 'string' && isPrefixedValue(value)) {
      const unprefixedValue = unprefixValue(value)

      if (autoFix) {
        style[property] = unprefixValue
      } else {
        addWarning({
          type: 'NO_VENDOR_PREFIX',
          hint: `The value "${value}" shoul not be vendor prefixes. Use "${unprefixedValue}" instead.`,
          suggestion: unprefixedValue,
          property,
          value
        })
      }
    }

    if (isPrefixedProperty(camelCasedProperty)) {
      const unprefixedProperty = unprefixProperty(camelCasedProperty)

      if (autoFix) {
        style[unprefixedProperty] = style[property]
        delete style[property]
      } else {
        addWarning({
          type: 'NO_VENDOR_PREFIX',
          description: `The property "${property}" should not be vendor prefixed. Use "${unprefixedProperty}" instead.`,
          suggestion: unprefixedProperty,
          property,
          value
        })
      }
    }
  })
}
