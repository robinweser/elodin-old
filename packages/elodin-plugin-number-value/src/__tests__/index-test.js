import numberValue from '../index'

const mockPluginInterface = warnings => (style, fix) => ({
  style,
  addWarning: warning => warnings.push(warning),
  fix: fix || false,
})

describe('Enforcing number values', () => {
  it('should warn if a unit is applied', () => {
    const warnings = []
    const pluginInterface = mockPluginInterface(warnings)

    numberValue()(
      pluginInterface({
        fontSize: '12px',
        lineHeight: 200,
        width: 10,
      })
    )

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({
      type: 'NUMBER_VALUE',
      description: 'Do not apply "px" unit to "12px". Use "12".',
      property: 'fontSize',
      suggestion: 12,
      value: '12px',
    })
  })

  it('should auto-fix the style', () => {
    const warnings = []
    const pluginInterface = mockPluginInterface(warnings)
    const style = {
      fontSize: '12px',
      lineHeight: 200,
      width: 10,
    }

    numberValue()(pluginInterface(style, true))

    expect(warnings.length).toBe(0)
    expect(style).toEqual({
      fontSize: 12,
      lineHeight: 200,
      width: 10,
    })
  })
})
