/* @flow */
import arrayReduce from '../arrayReduce'
import propertyShorthands from '../data/propertyShorthands'
import valueInitials from '../data/valueInitials'

export default function parseBasicLonghand(
  property: string,
  longhands: Object
) {
  if (propertyShorthands[property]) {
    const values = arrayReduce(
      propertyShorthands[property],
      (shorthand, longhand) => {
        // if longhand value is provided
        if (longhands[longhand]) {
          shorthand.push(longhands[longhand])
        } else {
          // if longhand value is not provided
        }

        return shorthand
      },
      []
    )

    return values.join(' ')
  }
}
