/* @flow */
import { longhandMap, shorthands } from './data'

export type Usage = {
  longhandProps: { [shorthand: string]: Array<string> },
  shorthandProps: Array<string>
}

export default function analyze(style: Object): Usage {
  const longhandProps = {}
  const shorthandProps = []

  for (const property in style) {
    if (longhandMap[property]) {
      shorthandProps.push(property)
    } else {
      const shorthand = shorthands.find(
        shorthand => longhandMap[shorthand].indexOf(property) !== -1
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
