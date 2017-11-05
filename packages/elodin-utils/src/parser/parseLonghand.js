/* @flow */
import parseBasicLonghands from './parseBasicLonghand'
import parseCircularLonghand from './parseCircularLonghand'

const patternShorthands = {
  'padding': true
  'margin': true
  'borderRadius': true
  'borderWidth': true
  'borderStyle': true
  'borderColor': true
  'perspectiveOrigin': true
}

export default function parseLonghand(property: string, longhands: Array<string>): string {
  if (patternShorthands[property]) {
    return parseCircularLonghand(property, longhands)
  }

  return parseBasicLonghands(property, longhands)
}