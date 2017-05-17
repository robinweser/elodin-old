import noShorthand from '../noShorthand'
import addWarningFactory from '../../utils/addWarningFactory'

describe('Checking for shorthand properties', () => {
  it('should do nothing if no shorthands are used', () => {
    const style = { alignContent: 'center' }
    const warnings = []
    const addWarning = addWarningFactory(warnings)

    noShorthand({ style, addWarning })

    expect(warnings.length).toEqual(0)
    expect(warnings).toEqual([])
  })

  it('should add a new warning with the affected shorthand and its longhands', () => {
    const style = { padding: 20 }
    const warnings = []
    const addWarning = addWarningFactory(warnings)

    noShorthand({ style, addWarning })

    expect(warnings.length).toEqual(1)
    expect(warnings[0].shorthand).toEqual('padding')
    expect(warnings[0].longhands).toEqual([
      'paddingBottom',
      'paddingLeft',
      'paddingRight',
      'paddingTop'
    ])
  })

  it('should generate the correct description', () => {
    const style = { padding: 20 }
    const warnings = []
    const addWarning = addWarningFactory(warnings)

    noShorthand({ style, addWarning })

    expect(warnings[0].description).toEqual(
      'Do not use the shorthand property "padding". Prefer "paddingBottom, paddingLeft, paddingRight, paddingTop" instead.'
    )
  })
})
