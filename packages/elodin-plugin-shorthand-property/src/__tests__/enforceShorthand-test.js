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
        paddingLeft: '2px',
        paddingTop: '4px'
      })
    )

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({
      type: 'SHORTHAND_LONGHAND',
      description:
        'Do not use the longhand properties "paddingLeft, paddingTop". Use the shorthand property "padding".',
      longhands: ['paddingLeft', 'paddingTop'],
      shorthand: 'padding'
    })
  })

  it('should warn if more than one longhand property is used', () => {
    const warnings = []
    const pluginInterface = mockPluginInterface(warnings)

    enforceShorthand(
      pluginInterface({
        paddingLeft: '2px',
        paddingTop: '4px'
      }),
      { allowSingle: true }
    )

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({
      type: 'SHORTHAND_LONGHAND',
      description:
        'Do not use the longhand properties "paddingLeft, paddingTop". Use the shorthand property "padding".',
      longhands: ['paddingLeft', 'paddingTop'],
      shorthand: 'padding'
    })
  })

  it('should not warn if only one longhand property is used', () => {
    const warnings = []
    const pluginInterface = mockPluginInterface(warnings)

    enforceShorthand(
      pluginInterface({
        paddingLeft: '2px'
      }),
      { allowSingle: true }
    )

    expect(warnings.length).toBe(0)
  })

  it('should warn if shorthand and longhand properties are mixed', () => {
    const warnings = []
    const pluginInterface = mockPluginInterface(warnings)

    enforceShorthand(
      pluginInterface({
        paddingLeft: '2px',
        paddingTop: '4px',
        padding: '4px 2px'
      })
    )

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({
      type: 'SHORTHAND_LONGHAND',
      description:
        'Do not mix the shorthand property "padding" with its longhand properties "paddingLeft, paddingTop". Use the single shorthand property "padding".',
      longhands: ['paddingLeft', 'paddingTop'],
      shorthand: 'padding'
    })
  })
})
