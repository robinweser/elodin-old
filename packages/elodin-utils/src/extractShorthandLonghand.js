/* @flow */
import { propertyShorthands } from 'elodin-data'

const shorthands = Object.keys(propertyShorthands)

export type Usage = {
  longhandProps: { [shorthand: string]: Array<string> },
  shorthandProps: Array<string>
}

export default function extractShorthandLonghand(style: Object): Usage {
  const longhandProps = {}
  const shorthandProps = []

  for (const property in style) {
    if (propertyShorthands[property]) {
      shorthandProps.push(property)
    } else {
      const shorthand = shorthands.find(
        shorthand => propertyShorthands[shorthand].indexOf(property) !== -1
      )

      if (shorthand) {
        if (!longhandProps[shorthand]) {
          longhandProps[shorthand] = []
        }

        longhandProps[shorthand].push(property)
      }
    }
  }

  return {
    longhandProps,
    shorthandProps
  }
}
