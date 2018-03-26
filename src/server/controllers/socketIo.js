'use strict';

module.exports = function (io, db) {

  let lastInterval = null;

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
    }, 1 * 1000 );
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
