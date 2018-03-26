'use strict';

const post = require('./post');

module.exports = function (db) {
    var module = {};

    module.post = post(db)

    return module;
};
