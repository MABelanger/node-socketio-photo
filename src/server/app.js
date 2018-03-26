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

let port = process.env.PORT || 9002;

const db = require('./db');
const apiCtrl = require('./controllers/api')(db);
const io = require('socket.io')(http);
const socketIoCtrl = require('./controllers/socketIo')(io, db);


app.use(bodyParser.json({limit: '50mb'}));

let mediaPath = __dirname + "/../../" + "media/";
let publicPath = __dirname + "/../../" + "public/";

app.use('/media', express.static(mediaPath))

// serve index.html + /camera + /screen
app.use('/', express.static(publicPath))


app.post('/api/photos', (req, res) => {
  let promiseCtrl = apiCtrl.photos.post.saveImage(req, res);
  promiseCtrl.then((imageInfo)=>{
    socketIoCtrl.emitNewImage()
  })
});

socketIoCtrl.onConnection();

http.listen(port, function(){
  console.log('listening on *:' + port);
});
