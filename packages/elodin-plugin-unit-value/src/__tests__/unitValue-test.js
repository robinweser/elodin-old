import unitValue from '../index'

const mockPluginInterface = warnings => (style, fix) => ({
  style,
  addWarning: warning => warnings.push(warning),
  fix: fix || false
})

describe('Enforcing units', () => {
  it('should warn if wrong units are used', () => {
    const warnings = []
    const pluginInterface = mockPluginInterface(warnings)

    unitValue({
      enforceUnit: {
        units: ['px', 'em']
      }
    })(
      pluginInterface({
        fontSize: '12pt',
        height: '10em',
        width: '200px'
      })
    )

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({
      type: 'UNIT_VALUE',
      description:
        'Do not use the unit "pt" for "fontSize". Use one of "px, em".',
      property: 'fontSize',
      suggestion: '12px',
      allowedUnits: ['px', 'em'],
      unit: 'pt',
      value: '12pt'
    })
  })

  it('should warn if wrong units are used', () => {
    const warnings = []
    const pluginInterface = mockPluginInterface(warnings)

    unitValue({
      enforceUnit: {
        units: ['px', 'em'],
        unitsPerProperty: {
          fontSize: ['pt'],
          height: ['px']
        }
      }
    })(
      pluginInterface({
        fontSize: '12pt',
        height: '10em',
        width: '200px'
      })
    )

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({
      type: 'UNIT_VALUE',
      description: 'Do not use the unit "em" for "height". Use one of "px".',
      property: 'height',
      suggestion: '10px',
      allowedUnits: ['px'],
      unit: 'em',
      value: '10em'
    })
  })
})
