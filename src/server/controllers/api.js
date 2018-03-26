'use strict';

const photos = require('./photos');

module.exports = function (db) {
    let module = {};

    module.photos = photos(db)

    return module;
};
