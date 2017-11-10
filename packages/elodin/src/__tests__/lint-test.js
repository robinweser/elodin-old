import sinon from 'sinon'

import lint from '../index'

describe('Linting styles', () => {
  it('should execute every plugin', () => {
    const plugin = sinon.spy()
    const anotherPlugin = sinon.spy()

    lint({ plugins: [plugin, anotherPlugin] })({ color: 'red' })

    expect(plugin.calledOnce).toBe(true)
    expect(anotherPlugin.calledOnce).toBe(true)
  })

  it('should add warnings', () => {
    const plugin = ({ style, addWarning }) => {
      if (style.foo) {
        addWarning({ description: 'foobar' })
      }
    }

    const warnings = lint({ plugins: [plugin] })({
      color: 'red',
      foo: true,
    })

    expect(warnings.length).toBe(1)
    expect(warnings[0]).toEqual({ description: 'foobar' })
  })
})
