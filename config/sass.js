module.exports = {
  options: {
    sourceMap: true,
    imagePath: '../img'
  },
  dist: {
    files: {
      'public/css/main.css': 'public/scss/main.scss'
    }
  }
};
