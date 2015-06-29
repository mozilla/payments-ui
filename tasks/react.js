module.exports = {
  jsx: {
    files: [{
      expand: true,
      cwd: 'jsx',
      src: ['**/*.jsx'],
      dest: 'public/js/components/',
      ext: '.js'
    }]
  }
};