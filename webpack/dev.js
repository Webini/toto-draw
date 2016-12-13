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
  entry: Object.assign({}, prod.entry, {
    app: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?reload=true',
      prod.entry.app
    ]
  }),
  output: Object.assign({}, prod.output, {
    filename: '[name].js'
  })
});