/* @flow */
import arrayReduce from './arrayReduce'
import { longhandMap } from './data/shorthandLonghand'

const patternShorthands = [
  'padding',
  'margin',
  'borderRadius',
  'borderWidth',
  'borderStyle',
  'borderColor',
  'perspectiveOrigin'
]

export default function parseLonghand(property: string, longhands: Object) {
  if (longhandMap[property]) {
    const values = arrayReduce(
      longhandMap[property],
      (shorthand, longhand) => {
        if (
          longhands[longhand] &&
          (patternShorthands.indexOf(property) === -1 ||
            shorthand.indexOf(longhands[longhand]) === -1)
        ) {
          shorthand.push(longhands[longhand])
        }
        return shorthand
      },
      []
    )

    return values.join(' ')
  }
}
