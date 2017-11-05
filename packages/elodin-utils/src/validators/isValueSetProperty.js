/* @flow */
import { valueSetProperties } from 'elodin-data'

export default function isValueSetProperty(property: string): boolean {
  return valueSetProperties[property] || false
}
