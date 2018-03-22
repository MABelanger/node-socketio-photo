'use strict';

const post = require('./post');

module.exports = function (io) {
    var module = {};


    module.post = post(io)

    return module;
};
