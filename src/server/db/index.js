'use strict';

let fs = require('fs');

function saveImage(imageBinary, fileName) {

  let promise = new Promise( (resolve, reject) => {
    if (!imageBinary) {
      reject(new Error('No image or wrong format'));
      return;
    }

    let filePath = "./media/" + fileName;

    fs.writeFile(filePath, imageBinary, function(err) {
      if(err) {
        reject(err);
      }
      resolve("File Saved");
    });
  });
  return promise;
}

module.exports = {
  saveImage
}
