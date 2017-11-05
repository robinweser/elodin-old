import { parse } from 'bredon'
import isValidProperty from '../isValidProperty'

describe('Validating properties', () => {
  it('should correctly validate property values', () => {
    expect(isValidProperty('paddingLeft', '2px')).toBe(true)
    expect(isValidProperty('paddingLeft', '100%')).toBe(true)
    expect(isValidProperty('paddingLeft', 'red')).toBe(false)
    expect(isValidProperty('paddingLeft', '2px 2px')).toBe(false)
    expect(isValidProperty('paddingLeft', '2px, 2px')).toBe(false)
  })
})
