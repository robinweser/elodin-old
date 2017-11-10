/* @flow */
import addWarningFactory from './utils/addWarningFactory'
import arrayReduce from './utils/arrayReduce'
import parseStyle from './utils/parseStyle'
import generateStyle from './utils/generateStyle'

import type { Warning } from '../../../types/Warning'

type ConfigType = {
  plugins?: Array<Function>,
  fix?: boolean,
}

export default function lint({
  plugins = [],
  fix = false,
}: ConfigType): Function {
  return (style: Object): Array<Warning> => {
    return arrayReduce(
      plugins,
      (warnings, plugin) => {
        const addWarning = addWarningFactory(warnings)
        const ast = parseStyle(style)

        plugin({
          style: ast,
          fix,
          addWarning,
        })

        style = generateStyle(ast)
        return warnings
      },
      []
    )
  }
}
