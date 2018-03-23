'use strict';

const db = require('../../db');

const post = require('./post');

module.exports = function (io) {
    var module = {};


    module.post = post(io, db)
    module.db = db;

    return module;
};
