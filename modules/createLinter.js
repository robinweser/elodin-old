/* @flow */
import getStyleAST from './utils/getStyleAST'
import addWarningFactory from './utils/addWarningFactory'
import arrayReduce from './utils/arrayReduce'

import type Warning from '../types/Warning'

type ConfigType = {
  plugins?: Array<Function>,
  autoFix?: boolean
}

export default function createLinter(config: ConfigType) {
  const plugins = config.plugins || []
  const autoFix = config.autoFix || false

  return function lint(style: Object): Array<Warning> {
    const AST = getStyleAST(style)

    return arrayReduce(
      plugins,
      (warnings, plugin) => {
        const addWarning = addWarningFactory(warnings)

        plugin({
          style,
          AST,
          autoFix,
          addWarning
        })

        return warnings
      },
      []
    )
  }
}
