import parseCircularLonghand from '../parseCircularLonghand'

describe('Parsing circular longhand properties', () => {
  it('should return a single shorthand value', () => {
    expect(
      parseCircularLonghand('padding', {
        paddingTop: '2px',
        paddingRight: '2px',
        paddingBottom: '2px',
        paddingLeft: '2px'
      })
    ).toEqual('2px')

    expect(
      parseCircularLonghand('padding', {
        paddingTop: '2px',
        paddingRight: '4px',
        paddingBottom: '2px',
        paddingLeft: '4px'
      })
    ).toEqual('2px 4px')

    expect(
      parseCircularLonghand('padding', {
        paddingTop: '2px',
        paddingRight: '4px',
        paddingBottom: '3px',
        paddingLeft: '4px'
      })
    ).toEqual('2px 4px 3px')

    expect(
      parseCircularLonghand('padding', {
        paddingTop: '2px',
        paddingRight: '2px',
        paddingBottom: '3px',
        paddingLeft: '2px'
      })
    ).toEqual('2px 2px 3px')

    expect(
      parseCircularLonghand('padding', {
        paddingTop: '2px',
        paddingRight: '4px',
        paddingBottom: '3px',
        paddingLeft: '1px'
      })
    ).toEqual('2px 4px 3px 1px')

    expect(
      parseCircularLonghand('padding', {
        paddingTop: '2px',
        paddingBottom: '3px'
      })
    ).toEqual('2px 0 3px')

    expect(
      parseCircularLonghand('padding', {
        paddingLeft: '3px'
      })
    ).toEqual('0 0 0 3px')

    expect(
      parseCircularLonghand('padding', {
        paddingTop: '3px'
      })
    ).toEqual('3px 0 0')

    expect(
      parseCircularLonghand('borderColor', {
        borderTopColor: 'red'
      })
    ).toEqual('red inherit inherit')

    expect(
      parseCircularLonghand('borderStyle', {
        borderRightStyle: 'solid'
      })
    ).toEqual('none solid none none')
  })
})
