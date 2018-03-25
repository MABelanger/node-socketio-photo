'use strict';

let moment = require('moment');

// For simplicity, we do not use a database like mongoDb.
// Keep note that the variable (objDb) is reset when the program is reloaded.

let objDb = {
  lastServerFilePath : "",
  lastImageDate: null,
  fileNumber: 0
};

function _setLastServerFilePath(filePath) {
  // remove the . from the filePath
  // ./media/img-1.jpg -> /media/img-1.jpg
  let serverFilePath = filePath.substr(1);
  objDb.lastServerFilePath = serverFilePath;
}

function getLastServerFilePath() {
  return objDb.lastServerFilePath;
}

function _updateLastImageDate() {
  objDb.lastImageDate = new Date();
}

function getLastImageDateFromNow() {
  return moment(objDb.lastImageDate).fromNow();
}

function incrementFileNumber() {
  objDb.fileNumber+=1;
}

function getFileNumber() {
  return objDb.fileNumber;
}

function updateImage(filePath){
  _setLastServerFilePath(filePath);
  _updateLastImageDate();
}

module.exports = {
  getLastServerFilePath,
  updateImage,
  getLastImageDateFromNow,
  incrementFileNumber,
  getFileNumber
}
