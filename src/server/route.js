'use strict';

const express = require('express');

const mediaPath = __dirname + "/../../" + "media/";
const publicPath = __dirname + "/../../" + "public/";

module.exports = function (app, photosSocketIo) {
    const photosAPI = require('./components/photos/photosAPI')(photosSocketIo);
    let module = {};

    module.enable = function () {
      app.use('/media', express.static(mediaPath))

      // serve index.html + /camera + /screen
      app.use('/', express.static(publicPath))

      app.post('/api/photos', photosAPI.create);

      // Enable socketIo on connection by default.
      photosAPI.onSocketIoConnection();
    }

    return module;
};
