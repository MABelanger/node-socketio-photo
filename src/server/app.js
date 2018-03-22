'use strict';

const fs = require('fs');
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser')


const apiController = require('./controllers/api');

let app = express();

app.use(bodyParser.json({limit: '50mb'}));

let mediaPath = __dirname + "/../../" + "media/";

app.use('/media', express.static(mediaPath))

console.log(mediaPath)

app.post('/api/photos', apiController.photos.post.saveImage); // Create
//app.get('/api/photos', apiController.photo.get.allItems); // Get

const PORT = process.env.PORT || 9001;

// Listen to the port 9001
app.listen(PORT);
console.log('http server started at : 0.0.0.0:' + PORT);


/* SocketIo */
let http = require('http').Server(app);


// let io = require('socket.io')(http);
// http.listen(3001, function() {
//   console.log('ws://localhost:3001');
// });
//
// // Whenever someone connects this gets executed
// io.on('connection', function(socket) {
//   console.log('A user connected');
//
//   socket.on('clientEvent', function(jsonData) {
//     let dataClient = JSON.parse(jsonData);
//     console.log('dataClient', dataClient)
//     socket.emit('serverEvent', JSON.stringify(
//       dataClient
//     ));
//     socket.broadcast.emit('serverEvent', JSON.stringify(
//       dataClient
//     ));
//   }); // end clientEvent()
//
//   socket.on('disconnect', function() {
//     console.log('A user disconnected');
//   });
// });
