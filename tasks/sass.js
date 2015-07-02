module.exports = {
  options: {
    sourceMap: true,
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
  email: {
    options: {
      outputStyle: 'expanded'
    },
    files: {
      'public/dist/email.css': 'public/scss/email.scss',
    },
  },
};
