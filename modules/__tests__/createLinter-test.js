import sinon from 'sinon'

import createLinter from '../createLinter'

describe('Linting styles', () => {
  it('should execute every plugin', () => {
    const plugin = sinon.spy()
    const anotherPlugin = sinon.spy()

    const lint = createLinter({ plugins: [plugin, anotherPlugin] })
    lint({ color: 'red' })

    expect(plugin.calledOnce).toBe(true)
    expect(anotherPlugin.calledOnce).toBe(true)
  })

  it('should add warnings', () => {
    const plugin = ({ style, addWarning }) => {
      if (style.foo) {
        addWarning({ description: 'foobar' })
      }
    }

    const lint = createLinter({ plugins: [plugin] })
    const warnings = lint({
      color: 'red',
      foo: true
    })

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({ description: 'foobar' })
  })
})
