'use strict';

const fs = require('fs');
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser')

const cors = require('./cors');

let app = express();

if(process.env.NODE_CORS === 'true') {
  app.use(cors.enable);
}

/* SocketIo */
let http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 9002;


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

app.get('/screen/', function(req, res){
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
