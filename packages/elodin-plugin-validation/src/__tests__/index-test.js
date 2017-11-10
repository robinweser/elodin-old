import lint from 'elodin'
import validation from '../index'

describe('Validation CSS declarations', () => {
  it('should add a warning if an invalid declaration is found', () => {
    const warnings = lint({
      plugins: [validation()],
    })({
      fontSize: '12px',
      lineHeight: 200,
      width: 'solid',
    })

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({
      type: 'VALIDATION',
      description:
        'The value "solid" is not valid in combination with "width".',
      property: 'width',
      value: 'solid',
    })
  })
})
