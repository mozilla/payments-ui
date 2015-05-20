[![Build Status](https://travis-ci.org/mozilla/payments-ui.svg)](https://travis-ci.org/mozilla/payments-ui)
[![Dependency Status](https://david-dm.org/mozilla/payments-ui.svg)](https://david-dm.org/mozilla/payments-ui)
[![devDependency Status](https://david-dm.org/mozilla/payments-ui/dev-status.svg)](https://david-dm.org/mozilla/payments-ui#info=devDependencies)

# Payments UI

This project comprises all styles, behaviour and interfaces for mozilla/payments


## Developers

### Watching for file changes in development.

We're using webpack to build a JS bundle

#### Under docker

If you're using payments-env to have the complete payments-ui you'll want to use
`grunt start` to watch for file changes.

#### Standalone

If you're running things standalone then `grunt service` runs the webpack dev-server.

### JavaScript Linting.

We're using eslint for JavaScript linting. Most editors will have instructions for
enabling eslint (see below for how to configure vim + syntastic). Alternatively
just run the `grunt eslint` command which is self-contained.

#### Eslint Vim settings (Syntastic)

You'll need the packages listed below installed globally:

```sh
npm install -g eslint babel-eslint eslint-plugin-react
```

Using syntastic, the following snippet turns on eslint selectively for projects with a .eslintrc.

```vim
autocmd FileType javascript let b:syntastic_checkers = findfile('.eslintrc', '.;') != '' ? ['eslint'] : ['jshint']
```

### Tests

To run the tests run: `grunt test`

### Dependency installation and updates

Install grunt-cli globally with `npm install -g grunt-cli`
Then run `npm install` to install the local deps.

#### npm deps only

We're aiming to only use npm packaged deps rather than bower. This is to be able to
track dep versions in one place.

#### Libraries + external deps

Normally built artifacts aren't committed. However, to manage dep changes more
tightly libs (JS, CSS + fonts) are committed to the tree.

JS libs are committed from node\_modules as webpack knows how to find deps in
node\_modules.

Whilst this creates noise it does help ensure deps in the browser
are identical and can't get mangled by a broken deps installation.

## Styleguide

**Note: the styleguide is in need of an update since the switch to react**

The styleguide is based on the styles and templates that live in the tree.

It can be build statically with the `grunt build-docs` command.

The styleguide is published here: http://mozilla.github.io/payments-ui/

### Updating the styleguide

Run `grunt publish-docs`


