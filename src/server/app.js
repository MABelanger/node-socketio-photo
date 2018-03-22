'use strict';

const fs = require('fs');
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser')

let app = express();


/* SocketIo */
let http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


const apiController = require('./controllers/api')(io);


app.use(bodyParser.json({limit: '50mb'}));

let mediaPath = __dirname + "/../../" + "media/";
let publicPath = __dirname + "/../../" + "public/";

app.use('/media', express.static(mediaPath))
app.use('/', express.static(publicPath))

console.log(mediaPath)


function cbImageSaved(imagePath){
  console.log('imagePath', imagePath)
}

app.post('/api/photos', apiController.photos.post.saveImage); // Create


// // Listen to the port 9001
// app.listen(PORT);
// console.log('http server started at : 0.0.0.0:' + PORT);
//





app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('messsage', msg)
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
