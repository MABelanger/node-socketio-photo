'use strict';

const db = require('./db');

function saveImage (req, res) {
  let promiseCtrl = new Promise((resolve, reject) => {
    if (req.body && req.body.dataUri) {
      let promiseDb = db.saveImage(req.body.dataUri);

      // console.log(req.connection.remoteAddress)
      promiseDb
        .then((imageInfo) => {
          res.json(imageInfo);
          resolve(imageInfo);
        })
        .catch(function (reason) {
          console.log('rejection promiseDb');
          let err = {
            msg: 'saveImage error! ' + reason
          };
          res.status(400).json(err);
          reject(err);
        });
    } else {
      let err = {
        msg: 'saveImage error! ' + 'No dataUri'
      };
      res.status(400).json(err);
      reject(err);
    }
  });

  return promiseCtrl;
}

module.exports = {
  saveImage
};
