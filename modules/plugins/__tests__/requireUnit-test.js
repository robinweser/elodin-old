import { preferNumber } from '../preferNumber'
import addWarningFactory from '../../utils/addWarningFactory'
import getStyleAST from '../../utils/getStyleAST'

describe('Checking for shorthand properties', () => {
  it('should do nothing if string values are used', () => {
    const style = { fontSize: 40 }
    const warnings = []
    const addWarning = addWarningFactory(warnings)
    const AST = getStyleAST(style)

    preferNumber({ style, addWarning, AST })

    expect(warnings.length).toBe(0)
    expect(warnings).toEqual([])
  })

  it('should add a new warning with the affected value', () => {
    const style = { fontSize: '40px' }
    const warnings = []
    const addWarning = addWarningFactory(warnings)
    const AST = getStyleAST(style)

    preferNumber({ style, addWarning, AST })

    expect(warnings.length).toBe(1)
    expect(warnings[0].suggestion).toBe(40)
  })

  it('should generate the correct description', () => {
    const style = { fontSize: '40px' }
    const warnings = []
    const addWarning = addWarningFactory(warnings)
    const AST = getStyleAST(style)

    preferNumber({ style, addWarning, AST })

    expect(warnings[0].description).toEqual(
      'Prefer pure numbers for "40px". Use "40" instead.'
    )
  })

  it('should auto-fix the value', () => {
    const style = { fontSize: '40px' }
    const warnings = []
    const addWarning = addWarningFactory(warnings)
    const AST = getStyleAST(style)

    preferNumber({ style, addWarning, AST, autoFix: true })

    expect(warnings.length).toBe(0)
    expect(style).toEqual({ fontSize: 40 })
  })

  it('should only fix px values', () => {
    const style = { fontSize: '40em' }
    const warnings = []
    const addWarning = addWarningFactory(warnings)
    const AST = getStyleAST(style)

    preferNumber({ style, addWarning, AST, autoFix: true })

    expect(warnings.length).toBe(0)
    expect(style).toEqual({ fontSize: '40em' })
  })
})
