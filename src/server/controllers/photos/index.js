'use strict';

const post = require('./post');

module.exports = function (db) {
    let module = {};

    module.post = post(db)

    return module;
};
