# Elodin

Elodin is a modern, fast & plugin-based linter for JavaScript style objects.<br>
It helps to write bulletproof and valid styles and pushes developer experience to a next level.

<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/elodin.svg?branch=master"> <a href="https://codeclimate.com/github/rofrischmann/elodin/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/elodin/badges/coverage.svg"></a> <img alt="npm downloads" src="https://img.shields.io/npm/dm/elodin.svg"> <img alt="npm version" src="https://badge.fury.io/js/elodin.svg"> <a href="https://gitter.im/rofrischmann/elodin"><img alt="Gitter" src="https://img.shields.io/gitter/room/rofrischmann/elodin.svg"></a>


## Support Us
Support Robin Frischmann's work on Fela and its ecosystem (Elodin) directly via [**Patreon**](https://www.patreon.com/rofrischmann).

Or support us on [**Open Collective**](https://opencollective.com/fela) to fund community work. This also includes Elodin as well.<br>
Thank you to all our backers!

<a href="https://opencollective.com/fela/backer/0/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/0/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/1/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/1/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/2/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/2/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/3/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/3/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/4/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/4/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/5/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/5/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/6/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/6/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/7/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/7/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/8/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/8/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/fela/backer/9/website?requireActive=false" target="_blank"><img src="https://opencollective.com/fela/backer/9/avatar.svg?requireActive=false"></a>


## Installation
```sh
yarn add elodin
```
You may alternatively use `npm i --save elodin`.

## The gist
```javascript
import { createLinter } from 'elodin'
import numberValue from 'elodin-plugin-number-value'
import longhandProperty from 'elodin-plugin-longhand-property'

// we create a preconfigured lint function
const lint = createLinter({
  plugins: [
    longhandProperty(),
    numberValue()
  ],
  fix: true
})

const style = {
  padding: '20px 0 10px 5em',
  fontSize: '15px',
  lineHeight: '1.2em'
}

// using the auto-fix option will automatically
// transform the initial style object
lint(style) === {
  paddingTop: 20,
  paddingBottom: 10,
  paddingLeft: '5em',
  fontSize: 15,
  lineHeight:  '1.2em'
}
```

## Documentation

## Contribution
We highly appreciate any contribution.<br>
For more information follow the document [Contributing](.github/CONTRIBUTING.md).<br>
Also, please read our [code of conduct](.github/CODE_OF_CONDUCT.md.md).

## Support
Join us on [Gitter](https://gitter.im/rofrischmann/elodin).<br>
We highly appreciate any contribution.<br>
We also love to get feedback.

## License
Elodin is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).
