// get a formatted commit message to review changes from the commit log
// github will turn some of these into clickable links
function getDeployMessage() {
  var ret = '\n\n';
  if (process.env.TRAVIS !== 'true') {
    ret += 'missing env vars for travis-ci';
    return ret;
  }
  ret += 'branch:       ' + process.env.TRAVIS_BRANCH + '\n';
  ret += 'SHA:          ' + process.env.TRAVIS_COMMIT + '\n';
  ret += 'range SHA:    ' + process.env.TRAVIS_COMMIT_RANGE + '\n';
  ret += 'build id:     ' + process.env.TRAVIS_BUILD_ID + '\n';
  ret += 'build number: ' + process.env.TRAVIS_BUILD_NUMBER + '\n';
  return ret;
}

module.exports = {
  styleguide: {
    options: {
      base: 'styleguide/build',
      message: 'Updating docs',
      repo: 'git@github.com:mozilla/payments-ui.git'
    },
    src: ['**'],
  },
  // This is a special branch that contains the built files.
  docker: {
    options: {
      // silent option prevents decrypted credentials leaking into
      // travis logs. See https://github.com/tschaub/grunt-gh-pages#optionssilent
      silent: true,
      branch: 'docker',
      clone: '.grunt/grunt-gh-pages/docker/',
      user: {
        name: process.env.GH_USER,
        email: process.env.GH_EMAIL,
      },
      repo: 'https://' + process.env.GH_TOKEN + '@github.com/mozilla/payments-ui.git',
      message: 'publish docker build branch (auto)' + getDeployMessage(),
    },
    src: ['public/**/*', 'Dockerfile'],
  }
};
