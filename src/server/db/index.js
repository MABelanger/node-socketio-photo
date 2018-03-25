'use strict';

let fs = require('fs');
let utils = require('./utils');
let imageDb = require('./imageDb');


function saveImage(dataUri) {

  imageDb.incrementNumber();
  let fileNumber = imageDb.getNumber();
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
      let info = imageDb.update(relativeFilePath);

      console.log('absoluteFilePath', info.absoluteFilePath)
      resolve(info.absoluteFilePath);
    });
  });
  return promise;
}

module.exports = {
  saveImage,
  getInfoImage: imageDb.getInfo
}
