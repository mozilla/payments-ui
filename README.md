[![Dependency Status](https://david-dm.org/mozilla/payments-ui.svg)](https://david-dm.org/mozilla/payments-ui)
[![devDependency Status](https://david-dm.org/mozilla/payments-ui/dev-status.svg)](https://david-dm.org/mozilla/payments-ui#info=devDependencies)

# Payments UI

This project comprises all styles, behaviour and interfaces for mozilla/payments

## Dependency installation and updates

Install grunt-cli globally with `npm install -g grunt-cli`
Then run `npm install` to install the local deps.

### npm deps only

We're aiming to only use npm packaged deps rather than bower. This is to be able to
track dep versions in one place.

### Libraries + external deps

Normally built artifacts aren't committed. However, to manage dep changes more
tightly libs (JS, CSS + fonts) are committed to the tree.

Whilst this creates noise it does help ensure deps in the browser
are identical and can't get mangled by a broken deps installation.

### Building card-validator when updated

By default the card-validator package doesn't ship built files.

If card-validator is updated to build it you need to do the following:

```shell
cd node_modules/card-validator
npm install
node_modules/bin/gulp build
```

Then from the project root run:

```shell
grunt copy
```

You should see git pick-up the modifications to card-validator.min.js

Hopefully in due course card-validator will be updated to negate the need
to do this.

## Styleguide

The styleguide is based on the styles and templates that live in the tree.

It can be build statically with the `grunt build-docs` command.

The styleguide is published here: http://mozilla.github.io/payments-ui/

## Updating the styleguide

Run `grunt publish-docs`
