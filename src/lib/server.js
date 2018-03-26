'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const middlewareCors = require('./middlewares/cors');

let app = express();

/* SocketIo */
const http = require('http').Server(app);
const io = require('socket.io')(http);
const photosSocketIo = require('./components/photos/photosSocketIo')(io);

// Limit the json to 50mb
app.use(bodyParser.json({limit: '50mb'}));

// Set CORS to true if the environement NODE_CORS is set.
if (process.env.NODE_CORS === 'true') {
  app.use(middlewareCors);
}

// All routing
let routes = require('./routes')(app, photosSocketIo);
routes.enable();

// Listen to the port.
const port = process.env.PORT || 9002;
http.listen(port, function () {
  console.log('listening on *:' + port);
});
