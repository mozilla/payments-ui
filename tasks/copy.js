module.exports = {
  nodedeps: {
    files: [{
      cwd: 'node_modules/normalize.css/',
      expand: true,
      src: 'normalize.css',
      dest: 'public/scss/lib/',
      ext: '.scss',
    }, {
      cwd: 'node_modules/connect-fonts-clearsans/fonts/default/',
      expand: true,
      src: '*',
      dest: 'public/fonts/clearsans/',
    }, {
      cwd: 'node_modules/connect-fonts-firasans/fonts/default/',
      expand: true,
      src: '*',
      dest: 'public/fonts/firasans/',
    }, {
      cwd: 'node_modules/mozilla-tabzilla/',
      expand: true,
      src: ['**/*.png'],
      dest: 'public/',
    }, {
      cwd: 'node_modules/mozilla-tabzilla/css/',
      expand: true,
      ext: '.scss',
      src: ['**/*.css'],
      dest: 'public/scss/lib/',
    }],

  },

};
