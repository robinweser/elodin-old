/* @flow */
import addWarningFactory from './utils/addWarningFactory'
import arrayReduce from './utils/arrayReduce'

import type { Warning } from '../../../types/Warning'

type ConfigType = {
  plugins: Array<Function>,
  fix?: boolean
}
export default function lint(
  style: Object,
  { plugins, fix = false }: ConfigType
): Array<Warning> {
  return arrayReduce(
    plugins,
    (warnings, plugin) => {
      const addWarning = addWarningFactory(warnings)

      plugin({
        style,
        fix,
        addWarning
      })

      return warnings
    },
    []
  )
}
