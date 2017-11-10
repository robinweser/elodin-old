import lint from 'elodin'

import unit from '../index'

describe('Unit plugin', () => {
  it('should warn if no units are used', () => {
    const warnings = lint({
      plugins: [
        unit({
          units: ['px', 'em'],
        }),
      ],
    })({
      fontSize: '12px',
      height: '10em',
      width: 200,
    })

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({
      type: 'UNIT',
      description: 'Do not use plain numbers for "width". Use one of "px, em".',
      property: 'width',
      suggestion: '200px',
      value: '200',
    })
  })

  it('should warn if wrong units are used', () => {
    const warnings = lint({
      plugins: [
        unit({
          units: ['px', 'em'],
        }),
      ],
    })({
      fontSize: '12pt',
      height: '10em',
      width: '200px',
    })

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({
      type: 'UNIT',
      description:
        'Do not use the unit "pt" for "fontSize". Use one of "px, em".',
      property: 'fontSize',
      suggestion: '12px',
      value: '12pt',
    })
  })

  it('should warn if wrong units are used', () => {
    const warnings = lint({
      plugins: [
        unit({
          units: ['px', 'em'],
          unitsPerProperty: {
            fontSize: ['pt'],
            height: ['px'],
          },
        }),
      ],
    })({
      fontSize: '12pt',
      height: '10em',
      width: '200px',
    })

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({
      type: 'UNIT',
      description: 'Do not use the unit "em" for "height". Use one of "px".',
      property: 'height',
      suggestion: '10px',
      value: '10em',
    })
  })
})
