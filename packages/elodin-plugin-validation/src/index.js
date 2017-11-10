/* @flow */
import { generate } from 'bredon'
import { isValidProperty } from 'bredon-validate'

import type { PluginInterface } from '../../../flowtypes/PluginInterface'

const PLUGIN_TYPE = 'VALIDATION'

function validation({ style, addWarning }: PluginInterface) {
  for (const property in style) {
    const value = generate(style[property])

    if (!isValidProperty(property, value)) {
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
