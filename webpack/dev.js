const webpack = require('webpack');
const prod    = require('./prod.js');

module.exports = Object.assign({}, prod, {
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  debug: true,
  devtool: '#eval-source-map',
  output: Object.assign({}, prod.output, {
    filename: '[name].js'
  })
});