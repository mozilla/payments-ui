module.exports = {
  payment: {
    entry: "./public/js/main.js",
    output: {
      filename: "public/js/bundle.js",
    },
    stats: {
      // Configure the console output
      colors: true,
      modules: true,
      reasons: true
    },
    failOnError: true, // don't report error to grunt if webpack find errors
    watch: true, // use webpacks watcher
    keepalive: true, // don't finish the grunt task
    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader' }
      ]
    },
    resolve: {
      // you can now require('file') instead of require('file.json')
      extensions: ['', '.js', '.jsx', '.json'],
      modulesDirectories: ['public/js/', 'public/jsx/', 'node_modules'],
    }
  },
};
