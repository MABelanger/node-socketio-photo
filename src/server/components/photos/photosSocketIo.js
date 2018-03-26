'use strict';
const db = require('./db');

let lastInterval = null;
const SECONDS_INTERVAL = 60;

module.exports = function (io) {

  let module = {};

  function _emitNewImage(imageInfo) {
    io.emit('newImage', imageInfo);
  }

  function _emitEachMinute(){
    if (lastInterval) {
      clearInterval(lastInterval);
    }
    lastInterval = setInterval (()=>{
      let imageInfo = db.getimageInfo();
      _emitNewImage(imageInfo);
    }, SECONDS_INTERVAL * 1000 );
  }

  module.emitNewImage = function(){
    let imageInfo = db.getimageInfo();
    _emitNewImage(imageInfo);
    _emitEachMinute();
  }

  module.onConnection = function(){
    io.on('connection', function(socket){
      module.emitNewImage()
    });
  }

  return module;
};
