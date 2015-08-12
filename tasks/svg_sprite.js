module.exports = {
  paymethods: {
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
          common: 'pay-method-icon',
          dimensions: true,
          padding: 10,
          prefix: '.pmtype-%s',
          dest: 'scss',
          sprite: '../img/pay-method-sprite.svg',
          bust: false,
          render: {
            scss: {
              dest: '_pay-method-sprite.scss'
            }
          }
        }
      }
    }
  },
  management: {
    expand: true,
    cwd: 'public/img/management',
    src: ['*.svg'],
    dest: 'public',
    options: {
      shape: {
        dimension: {
          maxWidth: 28,
          maxHeight: 28
        },
        dest: 'svg'
      },
      mode: {
        css: {
          layout: 'vertical',
          common: 'nav:after',
          dimensions: true,
          padding: 20,
          prefix: '.%s:after',
          dest: 'scss',
          sprite: '../img/mgmt-nav-sprite.svg',
          bust: false,
          render: {
            scss: {
              dest: '_mgmt-nav-sprite.scss'
            }
          }
        }
      }
    }
  }

};
