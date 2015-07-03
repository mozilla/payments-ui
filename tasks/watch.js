module.exports = {
  sass: {
    files: 'public/scss/**/*.scss',
    tasks: ['sass:dev'],
    options: {
      debounceDelay: 250
    }
  }
};
