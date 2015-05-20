module.exports = {
  styleguide: {
    src: 'styleguide',
    options: {
      sourcecodeSelector: 'main',
      templateGlobals: {
        projectName: 'Payments UI Styleguide',
        appMedia: '../static/public',
      },
      templateConfig: {
        templatePaths: ['templates'],
      },
      copy: [{
        src: '../public/',
        target: 'static/public',
      }],
    },
  },
};
