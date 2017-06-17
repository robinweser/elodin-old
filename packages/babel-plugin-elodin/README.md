# babel-plugin-elodin



## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-elodin
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["elodin"]
}
```

### Via CLI

```sh
$ babel --plugins elodin script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["elodin"]
});
```
