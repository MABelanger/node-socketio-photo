'use strict';

let db = require('../../../db');
let utils = require('./utils');

function _saveImage(dataUri) {
  let {data, fileName} = utils.getDataAndFileName(dataUri);
  return db.saveImage(data, fileName);
}

module.exports = function (io) {
    var module = {};

    module.saveImage = (req, res) => {
      if(req.body && req.body.dataUri) {
        let promiseSaveImage = _saveImage(req.body.dataUri);

        promiseSaveImage.then((serverFilePath) => {
          let msg = "Yay! saveImage done!";
          console.log(serverFilePath);
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
