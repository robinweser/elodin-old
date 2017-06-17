import enforceShorthand from '../enforceShorthand'

const mockPluginInterface = warnings => {
  return (style, fix) => ({
    style,
    addWarning: warning => warnings.push(warning),
    fix: fix || false
  })
}

describe('Enforcing shorthand properties', () => {
  it('should warn if longhand properties are used', () => {
    const warnings = []
    const pluginInterface = mockPluginInterface(warnings)

    enforceShorthand(
      pluginInterface({
        borderColor: 'red',
        borderStyle: 'solid'
      })
    )

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({
      type: 'SHORTHAND_LONGHAND',
      description:
        'Do not use the longhand properties "borderColor, borderStyle". Use the shorthand property "border".',
      longhands: ['borderColor', 'borderStyle'],
      shorthand: 'border'
    })
  })

  it('should warn if more than one longhand property is used', () => {
    const warnings = []
    const pluginInterface = mockPluginInterface(warnings)

    enforceShorthand(
      pluginInterface({
        borderColor: 'red',
        borderStyle: 'solid'
      }),
      true
    )

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({
      type: 'SHORTHAND_LONGHAND',
      description:
        'Do not use the longhand properties "borderColor, borderStyle". Use the shorthand property "border".',
      longhands: ['borderColor', 'borderStyle'],
      shorthand: 'border'
    })
  })

  it('should not warn if only one longhand property is used', () => {
    const warnings = []
    const pluginInterface = mockPluginInterface(warnings)

    enforceShorthand(
      pluginInterface({
        borderColor: 'red'
      }),
      true
    )

    expect(warnings.length).toBe(0)
  })

  it('should warn if shorthand and longhand properties are mixed', () => {
    const warnings = []
    const pluginInterface = mockPluginInterface(warnings)

    enforceShorthand(
      pluginInterface({
        borderColor: 'red',
        borderStyle: 'solid',
        border: '1px solid grey'
      })
    )

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({
      type: 'SHORTHAND_LONGHAND',
      description:
        'Do not mix the shorthand property "border" with its longhand properties "borderColor, borderStyle". Use the single shorthand property "border".',
      longhands: ['borderColor', 'borderStyle'],
      shorthand: 'border'
    })
  })
})
