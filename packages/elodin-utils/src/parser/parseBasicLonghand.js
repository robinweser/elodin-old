/* @flow */
import { propertyShorthands } from 'elodin-data'

import arrayReduce from '../arrayReduce'

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

  // TODO: error?
  return ''
}
