'use strict';

module.exports = function (io, db) {
    var module = {};

    module.saveImage = (req, res) => {
      if(req.body && req.body.dataUri) {
        let promiseSaveImage = db.saveImage(req.body.dataUri);

        console.log(req.connection.remoteAddress)
        promiseSaveImage.then((imageInfo) => {

          io.emit('newImage', imageInfo);
          res.json({msg : 'newImage' + imageInfo });

        }).catch(function(reason) {
          console.log('rejection promiseSaveImage')
          res.status(400).json({msg : 'saveImage error! ' + reason });
        });

      } else {
        res.status(400).json({msg : 'saveImage error! ' + 'No dataUri' });
      }
    }

    return module;
};
