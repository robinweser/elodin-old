import { requireUnit } from '../requireUnit'
import addWarningFactory from '../../utils/addWarningFactory'

describe('Requiring a unit', () => {
  it('should do nothing if unit values are used', () => {
    const style = { fontSize: '40px' }
    const warnings = []
    const addWarning = addWarningFactory(warnings)

    requireUnit({ style, addWarning })

    expect(warnings.length).toBe(0)
    expect(warnings).toEqual([])
  })

  it('should add a new warning with the affected value', () => {
    const style = { fontSize: 40 }
    const warnings = []
    const addWarning = addWarningFactory(warnings)

    requireUnit({ style, addWarning })

    expect(warnings.length).toBe(1)
    expect(warnings[0].suggestion).toBe('40px')
  })

  it('should generate the correct description', () => {
    const style = { fontSize: 40 }
    const warnings = []
    const addWarning = addWarningFactory(warnings)

    requireUnit({ style, addWarning })

    expect(warnings[0].description).toEqual(
      'Do not use plain numbers for "fontSize". Prefer explicit units e.g. "40px" instead.'
    )
  })

  it('should auto-fix the value', () => {
    const style = { fontSize: 40 }
    const warnings = []
    const addWarning = addWarningFactory(warnings)

    requireUnit({ style, addWarning, autoFix: true })

    expect(warnings.length).toBe(0)
    expect(style).toEqual({ fontSize: '40px' })
  })

  it('should use a custom unit', () => {
    const style = { fontSize: 40 }
    const warnings = []
    const addWarning = addWarningFactory(warnings)

    requireUnit({ style, addWarning, autoFix: true }, 'em')

    expect(warnings.length).toBe(0)
    expect(style).toEqual({ fontSize: '40em' })
  })
})
