'use strict';

let expect = require('chai').expect
let dbUtils = require('./db/utils');

describe('db', function () {
  describe('API dbUtils', function () {
    let arrayBin = new Buffer([
      71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 0, 0, 0, 33, 249, 4, 1,10,
      0, 1, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 2, 76, 1, 0, 59
    ]);

    it('should work!', function () {
      expect(true).to.be.true;
    });

    it('should get the right gif!', function () {
      let dataUri = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      let fileNumber = 1;

      let imgData = {
        "data": arrayBin,
        "fileName": "img-1.gif"
      };
      expect(dbUtils.getDataAndFileName(dataUri, fileNumber)).deep.equal(imgData);
    });

    it('should get the right jpg!', function () {
      let dataUri = "data:image/jpg;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      let fileNumber = 1;

      let imgData = {
        "data": arrayBin,
        "fileName": "img-1.jpg"
      };
      expect(dbUtils.getDataAndFileName(dataUri, fileNumber)).deep.equal(imgData);
    });

    it('should get the right bin!', function () {
      let dataUri = "data:image/;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      let fileNumber = 1;

      let imgData = {
        "data": arrayBin,
        "fileName": "img-1.bin"
      };
      expect(dbUtils.getDataAndFileName(dataUri, fileNumber)).deep.equal(imgData);
    });

    it('should get null data !', function () {
      let dataUri = "";
      let fileNumber = 1;

      let imgData = {
        "data": null,
        "fileName": "img-1.bin"
      };
      expect(dbUtils.getDataAndFileName(dataUri, fileNumber)).deep.equal(imgData);
    });

  });
});
