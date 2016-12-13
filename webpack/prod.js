const webpack            = require('webpack');
const path               = require('path');

module.exports = { 
  entry: {
    app: path.join(__dirname, '/../front/app.js'),
    vendors: [
      'paper'
    ],
  },
  output: {
    path: path.join(__dirname, '/../public/js'),
    publicPath: '/js',
    filename: '[name].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [ 
    new webpack.optimize.UglifyJsPlugin({
      output: {
        ascii_only: true
      },
      preserveComments: false,
      compress: {
        drop_debugger: true,
        drop_console: true,
      },
      beautify: false,
      mangle: true
    })
  ]
};