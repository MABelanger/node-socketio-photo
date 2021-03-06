'use strict';

const express = require('express');

// Headers to enable Cross-origin resource sharing (CORS)
const middlewareCors = require('./middlewares/cors');

let app = express();

/* SocketIo */
const http = require('http').Server(app);
const io = require('socket.io')(http);
const photosSocketIo = require('./components/photos/photosSocketIo')(io);

// Set CORS to true if the environement NODE_CORS is set.
if (process.env.NODE_CORS === 'true') {
  app.use(middlewareCors);
}

// All routing
let photosRoutes = require('./components/photos/photosRoutes')(app, photosSocketIo);
photosRoutes.enable();

// Listen to the port.
const port = process.env.PORT || 9002;
http.listen(port, function () {
  console.log('listening on *:' + port);
});
