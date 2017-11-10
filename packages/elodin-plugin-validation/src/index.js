/* @flow */
import isValidProperty from 'bredon-validate/lib/isValidProperty'

import type { PluginInterface } from '../../../flowtypes/PluginInterface'

const PLUGIN_TYPE = 'VALIDATION'

function validation({ style, addWarning, bredon }: PluginInterface) {
  for (const property in style) {
    const ast = style[property]

    if (!isValidProperty(property, ast)) {
      const value = bredon.generate(ast)

      addWarning({
        type: PLUGIN_TYPE,
        description: `The value "${value}" is not valid in combination with "${
          property
        }".`,
        property,
        value,
      })
    }
  }
}

export default () => validation
