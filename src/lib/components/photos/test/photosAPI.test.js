'use strict';

var app = require('express')();
let photosRoutes = require('../photosRoutes')(app);
photosRoutes.enable();

var should = require('should');
var chai = require('chai').should;
var request = require('supertest');

it('should saveImage img-0.gif!', function (done) {
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
