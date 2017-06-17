/* @flow */
import normalizeProperty from 'css-in-js-utils/lib/normalizeProperty'

import enforceShorthand from './rules/enforceShorthand'
import enforceLonghand from './rules/enforceLonghand'
import analyze from './utils/analyze'

import type { PluginInterface } from '../../../types/PluginInterface'

const rules = {
  shorthand: enforceShorthand,
  longhand: enforceLonghand
}

type Options = {
  enforce: 'shorthand' | 'longhand',
  allowSingle: boolean
}

function runRules(
  pluginInterface: PluginInterface,
  { enforce, allowSingle }: Options
) {
  rules[enforce](pluginInterface, allowSingle)
}

// TODO: enable for prefixed shorthand/longhands
export default function shorthandLonghand(options: Object): Function {
  return (pluginInterface: Object) =>
    runRules(pluginInterface, {
      enforce: 'shorthand',
      allowSingle: false,
      ...options
    })
}
