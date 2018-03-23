'use strict';

let fs = require('fs');
let utils = require('./utils');

let lastServerFilePath = "";
let fileNumber = 0;

function _setLastServerFilePath(serverFilePath) {
  lastServerFilePath = serverFilePath;
}

function getLastServerFilePath() {
  return lastServerFilePath;
}

function _getFileNumber() {
  return fileNumber;
}

function _incrementFileNumber() {
  fileNumber+=1;
}

function saveImage(dataUri) {

  _incrementFileNumber();
  let fileNumber = _getFileNumber();
  let {data, fileName} = utils.getDataAndFileName(dataUri, fileNumber);

  let promise = new Promise( (resolve, reject) => {
    if (!data) {
      reject(new Error('No image or wrong format'));
      return;
    }

    let filePath = "./media/" + fileName;

    fs.writeFile(filePath, data, function(err) {
      if(err) {
        reject(err);
      }
      // remove the . from the filePath
      // ./media/img-1.jpg -> /media/img-1.jpg
      let serverFilePath = filePath.substr(1);
      _setLastServerFilePath(serverFilePath);
      resolve(getLastServerFilePath());
    });
  });
  return promise;
}

module.exports = {
  saveImage,
  getLastServerFilePath
}
