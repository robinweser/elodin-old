/* @flow */
import normalizeProperty from 'css-in-js-utils/lib/normalizeProperty'
import objectEach from '../utils/objectEach'

import { shorthandLonghand, shorthands } from '../../data/shorthandLonghand'

import type PluginInterface from '../../types/PluginInterface'

export function noShorthand({ style, addWarning }: PluginInterface): void {
  objectEach(style, (value, property) => {
    const shorthand = normalizeProperty(property)

    if (shorthands.indexOf(shorthand) !== -1) {
      const longhands = shorthandLonghand[shorthand]

      addWarning({
        type: 'NO_SHORTHAND',
        description: `Do not use the shorthand property "${property}". Prefer "${longhands.join(', ')}" instead.`,
        longhands,
        shorthand
      })
    }
  })
}

export default () => noShorthand
