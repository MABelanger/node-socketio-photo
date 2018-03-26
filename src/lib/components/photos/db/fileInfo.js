'use strict';

let moment = require('moment');

// For simplicity, we do not use a database like mongoDb.
// We use the variable (fileInfo) that reset when the program is reloaded.

let fileInfo = {
  absoluteFilePath: '',
  date: null,
  number: 0
};

function _setAbsoluteFilePath (relativeFilePath) {
  // remove the . from the relativeFilePath
  // ./media/img-1.jpg -> /media/img-1.jpg
  fileInfo.absoluteFilePath = relativeFilePath.substr(1);
}

function _getAbsoluteFilePath () {
  return fileInfo.absoluteFilePath;
}

function _updateDate () {
  fileInfo.date = new Date();
}

function _getDateFromNow () {
  if (fileInfo.date) {
    return moment(fileInfo.date).fromNow();
  }
  return '';
}

function incrementNumber () {
  fileInfo.number += 1;
}

function getNumber () {
  return fileInfo.number;
}

function update (relativeFilePath) {
  _setAbsoluteFilePath(relativeFilePath);
  _updateDate();
  return getInfo();
}

function getInfo () {
  return {
    absoluteFilePath: _getAbsoluteFilePath(),
    dateFromNow: _getDateFromNow()
  };
}

module.exports = {
  update,
  getInfo,
  incrementNumber,
  getNumber
};
