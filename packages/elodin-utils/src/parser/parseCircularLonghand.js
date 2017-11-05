/* @flow */
import arrayReduce from '../arrayReduce'
import propertyShorthands from '../data/propertyShorthands'
import valueInitials from '../data/valueInitials'

const circularPattern = [
  { length: 4, matching: [1, 3] },
  { length: 3, matching: [0, 2] },
  { length: 2, matching: [0, 1] }
]

export default function parseCircularLonghand(
  property: string,
  longhands: Object
) {
  if (propertyShorthands[property]) {
    let values = arrayReduce(
      propertyShorthands[property],
      (shorthand, longhand) => {
        // if longhand value is provided
        if (longhands[longhand]) {
          shorthand.push(longhands[longhand])
        } else {
          shorthand.push(valueInitials[longhand])
        }

        return shorthand
      },
      []
    )

    circularPattern.forEach(({ length, matching }) => {
      if (
        values.length === length &&
        values[matching[0]] === values[matching[1]]
      ) {
        values.pop()
      }
    })

    return values.join(' ')
  }
}
