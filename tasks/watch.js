module.exports = {
  sass: {
    files: 'public/scss/**/*.scss',
    tasks: ['sass:dev'],
    options: {
      debounceDelay: 250
    }
  },
  sassemail: {
    files: 'public/scss/**/*.scss',
    tasks: ['sass:email'],
    options: {
      debounceDelay: 250
    }
  }

};
