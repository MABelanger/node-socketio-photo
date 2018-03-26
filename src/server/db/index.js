'use strict';

let fs = require('fs');
let utils = require('./utils');
let fileInfo = require('./fileInfo');


function saveImage(dataUri) {

  fileInfo.incrementNumber();
  let fileNumber = fileInfo.getNumber();
  let {data, fileName} = utils.getDataAndFileName(dataUri, fileNumber);


  let promise = new Promise( (resolve, reject) => {
    if (!data) {
      reject(new Error('No image or wrong format'));
      return;
    }

    let relativeFilePath = "./media/" + fileName;
    fs.writeFile(relativeFilePath, data, function(err) {
      if(err) {
        reject(err);
      }
      let imageInfo = fileInfo.update(relativeFilePath);
      resolve(imageInfo);
    });
  });
  return promise;
}

module.exports = {
  saveImage,
  getimageInfo: fileInfo.getInfo
}
