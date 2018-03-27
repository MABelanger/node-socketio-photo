'use strict';

let expect = require('chai').expect
let dbFileInfo = require('./db/fileInfo');

describe('db', function () {
  describe('API fileInfo', function () {

    it('should work!', function () {
      expect(true).to.be.true;
    });

    it('should getInfo()!', function () {
      dbFileInfo.clearDb();

      let result = {
        absoluteFilePath: '',
        dateFromNow: ''
      }
      expect(dbFileInfo.getInfo()).deep.equal(result);
    });

    it('should update()!', function () {
      let relativeFilePath = './directory/image.jpg';

      dbFileInfo.clearDb();
      let result = {
        absoluteFilePath: '/directory/image.jpg',
        dateFromNow: 'a few seconds ago'
      }
      expect(dbFileInfo.update(relativeFilePath)).deep.equal(result);

      it('should getNumber() after update!', function () {
        expect(dbFileInfo.getNumber()).deep.equal(1);
      });
    });
  });
});
