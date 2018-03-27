'use strict';

let expect = require('chai').expect
let photosAPI = require('../photosAPI');
var request = require('supertest');

describe('REST', function () {
  describe('API photosAPI', function () {

    it('should work!', function () {
      expect(true).to.be.true;
    });

    it('should saveImage img-0.gif!', function () {
      let bodyPost = {
        dataUri : "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      };

      let url = 'http://localhost:9002';
      let resource = '/api/photos';
      request(url)
        .post(resource)
        .send(bodyPost)
        .set('Connection', 'keep-alive')
        .expect('Content-Type', /json/)
        .expect(200) //Status code
        .end(function(err,res) {
          if (err) {
            //throw err;
            console.log(err)
          }
          expect(res.body).to.have.property('absoluteFilePath');
          expect(res.body).to.have.property('dateFromNow');
          expect(res.body.absoluteFilePath).to.be.equal('/media/img-0.gif');
          expect(res.body.dateFromNow).to.be.equal('a few seconds ago');

        });// ./end
    });
  });
});
