'use strict';

let expect = require('chai').expect
let db = require('./db');

describe('db', function () {
  describe('API db', function () {

    it('should work!', function () {
      expect(true).to.be.true;
    });

    it('should saveImage()!', function () {
      let dataUri = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

      db.clearDb();

      let result = {
        absoluteFilePath: '/media/img-0.gif',
        dateFromNow: 'a few seconds ago'
      };
      return db.saveImage(dataUri)
      .then((fileInfo)=>{
        expect(fileInfo).deep.equal(result);
      })

    });

  });
});
