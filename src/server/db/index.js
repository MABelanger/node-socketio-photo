'use strict';

let fs = require('fs');
let utils = require('./utils');
let objDb = require('./objDb');


function saveImage(dataUri) {

  objDb.incrementFileNumber();
  let fileNumber = objDb.getFileNumber();
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
      objDb.updateImage(filePath);
      resolve(objDb.getLastServerFilePath());
    });
  });
  return promise;
}

module.exports = {
  saveImage,
  getLastServerFilePath : objDb.getLastServerFilePath,
  getLastImageDateFromNow: objDb.getLastImageDateFromNow
}
