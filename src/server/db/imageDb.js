'use strict';

let moment = require('moment');

// For simplicity, we do not use a database like mongoDb.
// Keep note that the variable (imageDb) is reset when the program is reloaded.

let imageDb = {
  absoluteFilePath : "",
  date: null,
  number: 0
};

function _setAbsoluteFilePath(relativeFilePath) {
  // remove the . from the relativeFilePath
  // ./media/img-1.jpg -> /media/img-1.jpg
  imageDb.absoluteFilePath = relativeFilePath.substr(1);
}

function _getAbsoluteFilePath() {
  return imageDb.absoluteFilePath;
}

function _updateDate() {
  imageDb.imageDate = new Date();
}

function _getDateFromNow() {
  return moment(imageDb.imageDate).fromNow();
}

function incrementNumber() {
  imageDb.number+=1;
}

function getNumber() {
  return imageDb.number;
}

function update(relativeFilePath){
  _setAbsoluteFilePath(relativeFilePath);
  _updateDate();
  return getInfo()
}

function getInfo(){
  return {
    absoluteFilePath : _getAbsoluteFilePath(),
    dateFromNow: _getDateFromNow()
  };
}

module.exports = {
  update,
  getInfo,
  incrementNumber,
  getNumber
}
