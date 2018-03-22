'use strict';

let fileNumber = 0;

function _decodeBase64(dataUri) {
  let matches = dataUri.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  let file = {
    type : null,
    data : null
  };

  if (matches && matches.length === 3) {
    // get the type and convert the data base64 to binary
    file.type = matches[1];
    file.data = new Buffer(matches[2], 'base64');
  }
  return file;
}

function _getFileName(extention) {
  fileNumber += 1;
  return "img-" + fileNumber + "." + extention;
}

function _getExtention(fileType) {
  let typeArr = fileType.split('/');
  if(typeArr.length === 2 && typeArr[1]){
    return typeArr[1];
  }
  // return bin by default
  return "bin";
}

function getDataAndFileName(dataUri) {
  let {data, type} = _decodeBase64(dataUri);
  let extention = _getExtention(type)
  let fileName = _getFileName(extention);

  return {
    data,
    fileName
  }
}

module.exports = {
  getDataAndFileName
};
