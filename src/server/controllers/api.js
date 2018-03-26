'use strict';

const photos = require('./photos');

module.exports = function (db) {
    var module = {};

    module.photos = photos(db)

    return module;
};
