# Contributing
Want to get involved? **Awesome!**<br>
Please read the following guide on how to contribute, create issues and send pull requests.

If you have a feature request please create an issue. Also if you're even improving Elodin by any kind please don't be shy and send a pull request to let everyone benefit.

## Project setup
First of all you need to fork the project and clone it locally.
Afterwards you just need to install all the development dependencies.
```sh
git clone --bare https://github.com/rofrischmann/elodin.git
cd elodin
yarn run bootstrap
yarn run build
```

## Commands
To ensure code quality we've build some simple commands to run tests and code linting.

### `yarn run test`
Will run all tests using [jest](https://facebook.github.io/jest/). It also automatically generates coverage information which can be visually seen at `/coverage/lcov-report/index.html` afterwards.

### `yarn run lint`
Uses [eslint](http://eslint.org/docs/user-guide/command-line-interface) to do code linting.

### `yarn run flow`
Uses [Flow](https://flow.org) for type checking and static code analysis.

> You can use `yarn run check` to run all 3 commands above at once.

## Code Formatting
We use [prettier](https://github.com/prettier/prettier) for deterministic code-formatting. If you're using [Atom](https://atom.io) we recommend using the [atom-prettier](https://atom.io/packages/prettier-atom) plugin with the **Format on Save** option enabled.

## Guide-Lines
1. Fork the repo and create your feature/bug branch from `master`.
2. If you've added code that should be tested, add tests!
3. If you've changed APIs, update the documentation.
4. Ensure that all tests pass (`yarn run check`).
6. Ensure your code is formatted correctly (`yarn run format`)

## Creating Issues
### Known Issues
Before creating an issue please make sure it has not aleady been created/solved before. Also please search the docs for possible explanations.
Browse both open **and** closed issues. If you feel something is unclear you might also add it to the docs or FAQ's directly.

### Bugs & Feature Requests
If you found a new bug or got a feature request feel free to file a new issue. For both we got predefined templates which you should fill out as detailed as possible.

## Sending Pull Requests
If you are creating a pull request, try to use commit messages that are self-explanatory. Be sure to meet all guide-lines from above. If you're pushing a Work in Progress, please flag it and optionally add a description if something needs to be discussed.
