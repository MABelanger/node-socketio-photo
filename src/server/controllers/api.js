'use strict';

const photos = require('./photos');

module.exports = function (io) {
    var module = {};

    module.photos = photos(io)

    return module;
};
