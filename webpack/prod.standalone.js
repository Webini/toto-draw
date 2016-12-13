const path    = require('path');
const prod    = require('./prod.js');

module.exports = Object.assign({}, prod, {
  entry: {
    app: [
      path.join(__dirname, '/../front/app.js'),
      'paper'
    ]
  },
  module: {
    loaders: [
      {
        //expose paper, if we want to re-use it
        test: require.resolve('paper'),
        loader: 'expose?paper'
      },
      ...prod.module.loaders
    ]
  },
  output: Object.assign({}, prod.output, {
    filename: '[name].standalone.min.js'
  })
});

/**
 * 
      {
 */