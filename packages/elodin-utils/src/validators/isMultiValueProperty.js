/* @flow */
import { multiValueProperties } from 'elodin-data'

export default function isMultiValueProperty(property: string): boolean {
  return multiValueProperties[property] || false
}
