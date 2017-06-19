/* @flow */
import { extractShorthandLonghand } from 'elodin-utils'
import type { PluginInterface } from '../../../types/PluginInterface'

export default function enforceShorthand(
  { style, fix, addWarning }: PluginInterface,
  { allowSingle = false }: Object = {}
) {
  const { shorthandProps, longhandProps } = extractShorthandLonghand(style)

  for (const shorthand in longhandProps) {
    const longhands = longhandProps[shorthand]

    // if shorthand and longhand propeties are mixed
    if (shorthandProps.indexOf(shorthand) !== -1) {
      // TODO: fix

      addWarning({
        type: 'SHORTHAND_LONGHAND',
        description: `Do not mix the shorthand property "${shorthand}" with its longhand properties "${longhands.join(
          ', '
        )}". Use the single shorthand property "${shorthand}".`,
        shorthand,
        longhands
      })
    } else {
      // if a single longhand property is used
      if (!allowSingle || longhands.length > 1) {
        // TODO: fix

        addWarning({
          type: 'SHORTHAND_LONGHAND',
          description: `Do not use the longhand properties "${longhands.join(
            ', '
          )}". Use the shorthand property "${shorthand}".`,
          shorthand,
          longhands
        })
      }
    }
  }
}
