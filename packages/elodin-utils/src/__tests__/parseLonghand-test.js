import parseLonghand from '../parseLonghand'

describe('Parsing longhand properties', () => {
  it('should return a single shorthand value', () => {
    expect(
      parseLonghand('padding', {
        paddingTop: '2px',
        paddingRight: '2px',
        paddingBottom: '2px',
        paddingLeft: '2px'
      })
    ).toEqual('2px')

    expect(
      parseLonghand('padding', {
        paddingTop: '2px',
        paddingRight: '4px',
        paddingBottom: '2px',
        paddingLeft: '4px'
      })
    ).toEqual('2px 4px')

    expect(
      parseLonghand('padding', {
        paddingTop: '2px',
        paddingRight: '4px',
        paddingBottom: '3px',
        paddingLeft: '4px'
      })
    ).toEqual('2px 4px 3px')

    expect(
      parseLonghand('padding', {
        paddingTop: '2px',
        paddingRight: '4px',
        paddingBottom: '3px',
        paddingLeft: '1px'
      })
    ).toEqual('2px 4px 3px 1px')
  })

  it('should return an object of longhand values using types', () => {
    expect(
      parseLonghand('border', {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#FFF'
      })
    ).toEqual('#FFF solid 2px')

    expect(
      parseLonghand('border', {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#FFF'
      })
    ).toEqual('#FFF solid 2px')

    expect(
      parseLonghand('border', {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#FFF'
      })
    ).toEqual('#FFF solid 2px')

    expect(
      parseLonghand('border', {
        borderColor: 'blue',
        borderStyle: 'solid'
      })
    ).toEqual('blue solid')

    expect(
      parseLonghand('border', {
        borderWidth: '2px',
        borderStyle: 'solid'
      })
    ).toEqual('solid 2px')

    expect(
      parseLonghand('border', {
        borderWidth: '2px',
        borderStyle: 'solid'
      })
    ).toEqual('solid 2px')

    expect(
      parseLonghand('animation', {
        animationDuration: '3s',
        animationTimingFunction: 'ease-in',
        animationDelay: '1s',
        animationIterationCount: 2,
        animationDirection: 'reverse',
        animationFillMode: 'both',
        animationPlayState: 'paused',
        animationName: 'slidein'
      })
    ).toEqual('slidein 3s ease-in 1s 2 reverse both paused')

    expect(
      parseLonghand('animation', {
        animationDuration: '3s',
        animationTimingFunction: 'ease-in',
        animationDelay: '1s',
        animationIterationCount: 2,
        animationDirection: 'reverse',
        animationFillMode: 'both',
        animationPlayState: 'paused',
        animationName: 'slidein'
      })
    ).toEqual('slidein 3s ease-in 1s 2 reverse both paused')

    expect(
      parseLonghand('animation', {
        animationDuration: '3s',
        animationTimingFunction: 'linear',
        animationDelay: '1s',
        animationName: 'slidein'
      })
    ).toEqual('slidein 3s linear 1s')
  })
})
