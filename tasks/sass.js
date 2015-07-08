var path = require('path');

var env_ = 'local';

if (process.env.DEV) {
  env_ = 'dev';
}


module.exports = {
  options: {
    sourceMap: true,
    includePaths: [
      path.join('public/scss/config/', env_),
    ]
  },
  dev: {
    options: {
      outputStyle: 'expanded'
    },
    files: {
      'public/dist/main.css': 'public/scss/main.scss',
    },
  },
  min: {
    options: {
      outputStyle: 'compressed'
    },
    files: {
      'public/dist/main.min.css': 'public/scss/main.scss',
    },
  },
};
