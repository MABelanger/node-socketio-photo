'use strict';

const photosController = require('./photosController');

module.exports = function (photosSocketIo) {
  let module = {};

  module.create = function (req, res) {
    photosController.saveImage(req, res)
      .then((imageInfo) => {
        if(photosSocketIo) {
          photosSocketIo.emitNewImage();
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  module.onSocketIoConnection = function () {
    if(photosSocketIo) {
      photosSocketIo.onConnection();
    }
  };

  return module;
};
