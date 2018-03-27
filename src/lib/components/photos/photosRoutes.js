'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const ROOT_PATH = path.join(__dirname, '/../../../../');
const mediaPath = path.join(ROOT_PATH, 'media/');
const publicPath = path.join(ROOT_PATH, 'public/');

module.exports = function (app, photosSocketIo) {
  const photosAPI = require('./photosAPI')(photosSocketIo);

  let module = {};

  module.enable = function () {
    // Limit the json to 50mb
    app.use(bodyParser.json({limit: '50mb'}));

    // We can access the photo inside the /media folder
    app.use('/media', express.static(mediaPath));

    // serve index.html + /camera + /screen
    app.use('/', express.static(publicPath));

    // To post the photo with dataUri
    app.post('/api/photos', photosAPI.create);

    // Enable socketIo on connection by default.
    photosAPI.onSocketIoConnection();
  };

  return module;
};
