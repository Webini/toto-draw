'use strict';
const SOCKET_NAMESPACE = process.env.SOCKET_NAMESPACE || 'draw';
const EventsHandler    = require('./handler/events.js');
const express          = require('express');
const path             = require('path');
const app              = express();
const server           = require('http').Server(app);
const io               = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../public')));

io.of(`/${SOCKET_NAMESPACE}`)
  .on('connection', (socket) => {
    new EventsHandler(socket);
  });

module.exports = {
  http: server,
  io: io
};