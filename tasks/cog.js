module.exports = {
  styleguide: {
    src: 'styleguide',
    options: {
      sourcecodeSelector: '#view',
      templateGlobals: {
        projectName: 'Payments UI Styleguide',
        appMedia: '../static',
      },
      templateConfig: {
        templatePaths: ['templates'],
      },
      copy: [{
        src: '../public/',
        target: 'static/public',
      }, {
        src: 'jsx-bundles/',
        target: 'static/jsx',
      }],
    },
  },
};
