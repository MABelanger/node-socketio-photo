'use strict';

const photosController = require('./photosController');

module.exports = function (photosSocketIo) {
  let module = {};

  module.create = function (req, res) {
    let promiseCtrl = photosController.saveImage(req, res);
    promiseCtrl.then((imageInfo) => {
      photosSocketIo.emitNewImage();
    })
      .catch((err) => {
        console.log('err', err);
      });
  };

  module.onSocketIoConnection = function () {
    photosSocketIo.onConnection();
  };

  return module;
};
