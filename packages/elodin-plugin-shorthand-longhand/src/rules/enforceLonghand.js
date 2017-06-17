/* @flow */
import analyze from '../utils/analyze'
import { longhandMap } from '../utils/data'

import type { PluginInterface } from '../../../../types/PluginInterface'

export default function enforceShorthand(
  { style, fix, addWarning }: PluginInterface,
  allowSingle: boolean
) {
  const { shorthandProps, longhandProps } = analyze(style)

  shorthandProps.forEach(shorthand => {
    if (longhandProps[shorthand]) {
      const longhands = longhandProps[shorthand]

      // if shorthand and longhand properties are mixed
      if (longhands.length > 0) {
        // TODO: fix
        addWarning({
          type: 'SHORTHAND_LONGHAND',
          description: `Do not mix the shorthand property "${shorthand}" with its longhand properties "${longhands.join(
            ', '
          )}". Use the longhand properties "${longhandMap[shorthand].join(
            ', '
          )}".`,
          shorthand,
          longhands
        })
      } else {
        // if a single shorthand is used
        if (!allowSingle) {
          // TODO: fix
          addWarning({
            type: 'SHORTHAND_LONGHAND',
            description: `Do not use the shorthand property "${shorthand}". Use the longhand properties "${longhandMap[
              shorthand
            ].join(', ')}".`,
            shorthand,
            longhands
          })
        }
      }
    }
  })
}
