module.exports = {
  nodedeps: {
    files: [{
      cwd: 'node_modules/normalize.css/',
      expand: true,
      src: 'normalize.css',
      dest: 'public/scss/lib/',
      ext: '.scss'
    }, {
      cwd: 'node_modules/braintree-web/dist/',
      expand: true,
      src: 'braintree.js',
      dest: 'public/lib/js/',
      filter: 'isFile',
      ext: '.min.js'
    }, {
      cwd: 'node_modules/card-validator/dist/js',
      expand: true,
      src: 'app.built.min.js',
      dest: 'public/lib/js/',
      filter: 'isFile',
      rename: function(dest, src) {
        return dest + 'card-validator.min.js';
      }
    }, {
      cwd: 'node_modules/connect-fonts-clearsans/fonts/default/',
      expand: true,
      src: '*',
      dest: 'public/fonts/clearsans/'
    }, {
      cwd: 'node_modules/connect-fonts-firasans/fonts/default/',
      expand: true,
      src: '*',
      dest: 'public/fonts/firasans/'
    }, {
      cwd: 'node_modules/jquery/dist',
      expand: true,
      src: 'jquery.min.js',
      dest: 'public/lib/js/'
    }, {
      cwd: 'node_modules/requirejs/',
      expand: true,
      src: 'require.js',
      dest: 'public/lib/js/'
    }, {
      cwd: 'node_modules/formatter.js/dist/',
      expand: true,
      src: 'formatter.min.js',
      dest: 'public/lib/js/'
    }, {
      cwd: 'node_modules/react/dist/',
      expand: true,
      src: 'react.js',
      dest: 'public/lib/js/'
    }, {
      cwd: 'node_modules/react-maskedinput/dist/',
      expand: true,
      src: 'react-maskedinput.js',
      dest: 'public/lib/js/'
    }]
  }
};
