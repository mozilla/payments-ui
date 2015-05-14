module.exports = {
  sass: {
    files: 'public/scss/**/*.scss',
    tasks: ['sass'],
    options: {
      debounceDelay: 250
    }
  },
  jsx: {
    files: 'jsx/**/*.jsx',
    tasks: ['react'],
    options: {
      debounceDelay: 250
    }
  }
};