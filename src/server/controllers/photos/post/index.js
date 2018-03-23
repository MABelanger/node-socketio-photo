'use strict';

module.exports = function (io, db) {
    var module = {};

    module.saveImage = (req, res) => {
      if(req.body && req.body.dataUri) {
        let promiseSaveImage = db.saveImage(req.body.dataUri);

        promiseSaveImage.then((serverFilePath) => {
          let msg = "Yay! saveImage done!";
          io.emit('chat message', serverFilePath);
          res.json({msg : 'saveItem and saveImage ok'});

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
