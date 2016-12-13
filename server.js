require('dotenv').config();

const server        = require('./server/server.js').http;
const winston       = require('winston');
const LOG_PREFIX    = 'TotoDrawService';
const port          = process.env.SERVER_PORT || 8080;
const host          = process.env.SERVER_HOST || 'localhost';

server.listen(port, host, () => {
  winston.info(LOG_PREFIX, `Server started on ${host}:${port}`);
});