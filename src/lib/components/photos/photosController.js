'use strict';

const db = require('./db');

function _send400Err (res, reject, reason) {
  let err = {
    msg: 'saveImage error! ' + reason
  };
  res.status(400).json(err);
  reject(err);
}

function _saveDb (dataUri, res, resolve, reject) {
  // console.log(req.connection.remoteAddress)
  db.saveImage(dataUri)
    .then((imageInfo) => {
      res.json(imageInfo);
      resolve(imageInfo);
    })
    .catch(function (reason) {
      _send400Err(res, reject, reason);
    });
}

function saveImage (req, res) {
  let promiseCtrl = new Promise((resolve, reject) => {
    if (req.body && req.body.dataUri) {
      let dataUri = req.body.dataUri;
      _saveDb(dataUri, res, resolve, reject);
    } else {
      _send400Err(res, reject, 'dataUri missing');
    }
  });

  return promiseCtrl;
}

module.exports = {
  saveImage
};
