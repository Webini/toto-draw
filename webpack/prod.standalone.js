const path    = require('path');
const prod    = require('./prod.js');

module.exports = Object.assign({}, prod, {
  entry: {
    app: [
      path.join(__dirname, '/../front/app.js'),
      'paper'
    ]
  },  
  output: Object.assign({}, prod.output, {
    filename: '[name].full.min.js'
  })
});