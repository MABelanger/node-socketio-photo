'use strict';

let fs = require('fs');
let utils = require('./utils');
let fileInfo = require('./fileInfo');

const RELATIVE_MEDIA_PATH = './media/';

function saveImage (dataUri) {
  let fileNumber = fileInfo.getNumber();
  let {data, fileName} = utils.getDataAndFileName(dataUri, fileNumber);

  let promise = new Promise((resolve, reject) => {
    if (!data) {
      reject(new Error('No image or wrong format'));
      return;
    }

    let relativeFilePath = RELATIVE_MEDIA_PATH + fileName;
    fs.writeFile(relativeFilePath, data, function (err) {
      if (err) {
        reject(err);
        return;
      }
      let imageInfo = fileInfo.update(relativeFilePath);
      resolve(imageInfo);
    });
  });

  return promise;
}

module.exports = {
  saveImage,
  getimageInfo: fileInfo.getInfo,
  clearDb: fileInfo.clearDb
};
