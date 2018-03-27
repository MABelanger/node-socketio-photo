'use strict';

let app = require('express')();
let photosRoutes = require('../photosRoutes')(app);
photosRoutes.enable();

let should = require('should');
let chai = require('chai').should;
let request = require('supertest');

it('should saveImage at /api/photos!', function (done) {
  let bodyPost = {
    dataUri: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  };

  let resource = '/api/photos';

  let result1 = {
    absoluteFilePath: '/media/img-0.gif',
    dateFromNow: 'a few seconds ago'
  };

  let result2 = {
    absoluteFilePath: '/media/img-1.gif',
    dateFromNow: 'a few seconds ago'
  };

  request(app)
    .post(resource)
    .type('json')
    .send(bodyPost)
    .expect(200, result1)
    .end(function (res) {
      request(app)
        .post(resource)
        .type('json')
        .send(bodyPost)
        .expect(200, result2)
        .end(function (res) {
          // Bug i need console.log
          console.log(res);
          done();
        }); // end
    });// end
}); // it

it('should getImage at /media/img-0.gif!', function (done) {
  let arrayBin = new Buffer([
    71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 0, 0, 0, 33, 249, 4, 1, 10,
    0, 1, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 2, 76, 1, 0, 59
  ]);
  let resource = '/media/img-0.gif';

  request(app)
    .get(resource)
    .expect(200, arrayBin)
    .end(function (res) {
      console.log(res);
      done();
    });// end
}); // it

it('should getImage at /media/img-1.gif!', function (done) {
  let arrayBin = new Buffer([
    71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 0, 0, 0, 33, 249, 4, 1, 10,
    0, 1, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 2, 76, 1, 0, 59
  ]);
  let resource = '/media/img-1.gif';

  request(app)
    .get(resource)
    .expect(200, arrayBin)
    .end(function (res) {
      console.log(res);
      done();
    });// end
}); // it
