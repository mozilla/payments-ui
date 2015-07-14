module.exports = {
  cardicons: {
    expand: true,
    cwd: 'node_modules/payment-icons/min/flat',
    src: ['*.svg'],
    dest: 'public',
    options: {
      shape: {
        dimension: {
          maxWidth: 40,
          maxHeight: 40
        },
        dest: 'svg'
      },
      mode: {
        css: {
          layout: 'vertical',
          common: 'card-icon',
          dimensions: true,
          padding: 10,
          prefix: '.cctype-%s',
          dest: 'scss',
          sprite: '../img/cardicons-sprite.svg',
          bust: false,
          render: {
            scss: {
              dest: '_cardicons-sprite.scss'
            }
          }
        }
      }
    }
  }
};
