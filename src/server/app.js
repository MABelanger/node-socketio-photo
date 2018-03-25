'use strict';

const fs = require('fs');
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');

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
const db = require('./db');


app.use(bodyParser.json({limit: '50mb'}));

let mediaPath = __dirname + "/../../" + "media/";
let publicPath = __dirname + "/../../" + "public/";

app.use('/media', express.static(mediaPath))

// serve index.html + /camera + /screen
app.use('/', express.static(publicPath))


app.post('/api/photos', apiController.photos.post.saveImage); // Create

io.on('connection', function(socket){

  let imageInfo = db.getimageInfo();

  io.emit('newImage', imageInfo);

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
