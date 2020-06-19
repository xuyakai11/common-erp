const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
  productionSourceMap: true,
  configureWebpack:{
    plugins: [
      // new CompressionWebpackPlugin({
      //   test: /\.js$|\.css$/,
      //   threshold: 1024,
      // }),
      // new SentryWebpackPlugin({
      //   include: './dist',
      //   release: process.env.RELEASE_VERSION,
      //   ignoreFile: '.sentrycliignore',
      //   ignore: ['node_modules', 'webpack.config.js'],
      //   configFile: 'sentry.properties'
      // })
    ]
  }
}