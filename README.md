[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
[![Build Status](https://travis-ci.org/mozilla/payments-ui.svg?branch=master)](https://travis-ci.org/mozilla/payments-ui)
[![Dependency Status](https://david-dm.org/mozilla/payments-ui.svg)](https://david-dm.org/mozilla/payments-ui)
[![devDependency Status](https://david-dm.org/mozilla/payments-ui/dev-status.svg)](https://david-dm.org/mozilla/payments-ui#info=devDependencies)


*Note* This project is no longer maintained.

[![Sauce Test Status](https://saucelabs.com/browser-matrix/moz-payments-ui.svg)](https://saucelabs.com/u/moz-payments-ui)

*Note* Sauce Labs tests are only run on PRs from the main repo or commits to master.

# Payments UI

This project comprises all styles, behaviour and interfaces for
[mozilla/payments](https://github.com/mozilla/payments).


## Grunt tasks

Run tasks with `grunt` e.g. `grunt watch-static` or `grunt serve`.

| Task name       | Description |
| ------------ | --------------- |
| build  | build all CSS/JS files for deployment |
| serve  | watch CSS/JS for changes; serves static files via `webpack` dev server to enable [hot module reloading](http://webpack.github.io/docs/hot-module-replacement-with-webpack.html) |
| test | run tests locally |
| test-sauce | run full Sauce Labs test suite |
| watch-email | watch email-specific static files for changes; updates CSS/JS on change |
| watch-static | watch files for changes; updates CSS/JS on change |

## Developers

### Email Styles

To get the right paths for the email CSS and rebuild files as they change run:

```
DEV=1 grunt watch-email
```

### Dependency installation and updates

Install [grunt-cli](http://gruntjs.com/)
globally with `npm install -g grunt-cli`.
Then run `npm install` to install the local deps needed for development.

Dependencies are automatically kept up-to-date using [greenkeeper](http://greenkeeper.io/).

#### npm deps only

We're aiming to only use npm packaged deps rather than bower. This is to be able to
track dep versions in one place.

#### Libraries + external deps

Normally built artifacts aren't committed. However, to manage dep changes more
tightly, production libs (JS, CSS + fonts) are committed to the tree.

JS libs are committed from `node_modules` as webpack knows how to find deps in
`node_modules`.

Whilst this creates noise it does help ensure deps in the browser
are identical and can't get mangled by a broken deps installation.

#### dealing with bower

Unfortunately some deps only work with bower. For these cases, make sure
`bower.json` has the package name and version, run `bower install`, and
commit the distributed files to `public/bower_components`. Hopefully these
cases will be rare.

### Watching for file changes in development.

If you're using [payments-env][payments-env]
to run the complete payments system then you'll want to use
`grunt watch-static` on your host to watch for file changes.
In other words, start docker to run all the things but keep a shell open
on the host machine just to compile static assets for the docker VM to serve.

### Hot module reloading

If you run the webpack-dev-server you can get hot module reloading. This turns
on a feature where the code automatically updates in the browser as you change
the code in your editor.

For example run `grunt serve` to run the webpack-dev-server.

And then visit:

http://localhost:8080/webpack-dev-server/management.html

You should find that changes to the react modules are reflected immediately without
refresh. Read on if you want to also interact with the API server.

#### Developing with webpack-dev-server + docker for hot reloading.

If you are running the full stack with [payments-env][payments-env] then you'll also
be able to interact with the API when using hot reloading.

First, create an `/etc/hosts` entry like `127.0.0.1  pay.webpack`
so that you can access your webpack server on a predictable host.

To see the purchase interface with hot module loading enabled visit
the example site at:

http://pay.dev?webpack

To see the management interface:

http://pay.webpack:8080/webpack-dev-server/management.html

### JavaScript Linting

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

To run the tests locally run: `grunt test`. This will run the unit tests
against Firefox.

#### Cross-browser testing

The tests are run only on Firefox when a PR is submitted. When that code is
landed on master, Travis will run the tests on Sauce Labs.

##### Running Sauce Labs on a PR [Team Only]

If you're a member of the payments team and you want to get Sauce Labs coverage
for a PR - push the branch to the main `mozilla/payments-ui` repo and make a PR
from that.

##### Running the tests on SauceLabs locally

First [Sign-up for a Sauce Labs 'Open Sauce' account](https://saucelabs.com/opensauce/)
to get your keys.

Then you'll need to export the SauceLabs username and access key as env vars:

```shell
export SAUCE_USERNAME=<YOUR_OPEN_SAUCE_USERNAME>
export SAUCE_ACCESS_KEY=<YOUR_ACCESS_KEY>
```

Then you should find you can run: `grunt karma:sauce` and run all the tests on SauceLabs.

## Styleguide

The styleguide is based on the styles and templates that live in the tree.

It can be build statically with the `grunt build-styleguide` command.

The styleguide is published [here](http://mozilla.github.io/payments-ui/).

### Updating the styleguide

Run `grunt publish-styleguide`

### Running the styleguide locally

Run `grunt styleguide` (defaults to running on [localhost:4001](http://localhost:4001)).

## Localization (l10n)

We're using grunt-i18n-abide to run the extraction commands.

Because we're using React we need to operate on the compiled JS file. This also means we aren't running extraction
on un-used code.

To run an extraction, checkout out the [payments-l10n repository](https://github.com/mozilla/payments-l10n/) so that it has the same parent directory as payments-ui (`../payments-l10n` from the current location). Then do the following:

```
npm install
grunt webpack abideExtract
```

[payments-env]: https://github.com/mozilla/payments-env/
