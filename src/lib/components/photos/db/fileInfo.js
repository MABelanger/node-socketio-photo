'use strict';

let moment = require('moment');

// For simplicity, we do not use a database like mongoDb.
// We use the variable (fileInfo) that reset when the program is reloaded.

const INIT_FILE_INFO = {
  absoluteFilePath: '',
  date: null,
  number: 0
};

let fileInfo = Object.assign({}, INIT_FILE_INFO);

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

function _incrementNumber () {
  fileInfo.number += 1;
}

function getNumber () {
  return fileInfo.number;
}

function update (relativeFilePath) {
  _setAbsoluteFilePath(relativeFilePath);
  _updateDate();
  _incrementNumber();
  return getInfo();
}

function getInfo () {
  return {
    absoluteFilePath: _getAbsoluteFilePath(),
    dateFromNow: _getDateFromNow()
  };
}

function clearDb () {
  fileInfo = Object.assign({}, INIT_FILE_INFO);
}

module.exports = {
  update,
  getInfo,
  getNumber,
  clearDb
};
