'use strict';

const express = require('express');
const path = require('path');

const mediaPath = path.join(__dirname, '/../../../../', 'media/');
const publicPath = path.join(__dirname, '/../../../../', 'public/');

console.log('mediaPath', mediaPath)

module.exports = function (app, photosSocketIo) {
  const photosAPI = require('./photosAPI')(photosSocketIo);
  let module = {};

  module.enable = function () {
    app.use('/media', express.static(mediaPath));

    // serve index.html + /camera + /screen
    app.use('/', express.static(publicPath));

    app.post('/api/photos', photosAPI.create);

    // Enable socketIo on connection by default.
    photosAPI.onSocketIoConnection();
  };

  return module;
};
