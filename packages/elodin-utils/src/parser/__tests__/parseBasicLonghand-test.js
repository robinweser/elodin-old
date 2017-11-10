import parseBasicLonghand from '../parseBasicLonghand'

describe('Parsing longhand properties', () => {
  it('should return a single shorthand value', () => {
    expect(
      parseBasicLonghand('border', {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#FFF',
      })
    ).toEqual('#FFF solid 2px')

    expect(
      parseBasicLonghand('border', {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#FFF',
      })
    ).toEqual('#FFF solid 2px')

    expect(
      parseBasicLonghand('border', {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#FFF',
      })
    ).toEqual('#FFF solid 2px')

    expect(
      parseBasicLonghand('border', {
        borderColor: 'blue',
        borderStyle: 'solid',
      })
    ).toEqual('blue solid')

    expect(
      parseBasicLonghand('border', {
        borderWidth: '2px',
        borderStyle: 'solid',
      })
    ).toEqual('solid 2px')

    expect(
      parseBasicLonghand('border', {
        borderWidth: '2px',
        borderStyle: 'solid',
      })
    ).toEqual('solid 2px')

    expect(
      parseBasicLonghand('animation', {
        animationDuration: '3s',
        animationTimingFunction: 'ease-in',
        animationDelay: '1s',
        animationIterationCount: 2,
        animationDirection: 'reverse',
        animationFillMode: 'both',
        animationPlayState: 'paused',
        animationName: 'slidein',
      })
    ).toEqual('ease-in 3s 1s 2 reverse both paused slidein')

    expect(
      parseBasicLonghand('animation', {
        animationDuration: '3s',
        animationTimingFunction: 'ease-in',
        animationDelay: '1s',
        animationIterationCount: 2,
        animationDirection: 'reverse',
        animationFillMode: 'both',
        animationPlayState: 'paused',
        animationName: 'slidein',
      })
    ).toEqual('ease-in 3s 1s 2 reverse both paused slidein')

    expect(
      parseBasicLonghand('animation', {
        animationDuration: '3s',
        animationTimingFunction: 'linear',
        animationDelay: '1s',
        animationName: 'slidein',
      })
    ).toEqual('linear 3s 1s slidein')
  })
})
