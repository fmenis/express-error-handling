'use strict';

/**
 * Mock database layer.
 * Every method return a promise in order to simulate a real db interaction
 */

const shortid = require('shortid');

let db = [
    {
        id: shortid.generate(),
        name: 'Phil',
        age: 30,
        is_deleted: false,
        created_at: new Date(),
        updated_at: null
    }
];


module.exports.create = obj => {
    db.push(obj);
    return Promise.resolve();
};

module.exports.getAll = () => {
    return Promise.resolve(db);
};

module.exports.getById = id => {
    const obj = db.find(obj => obj.id === id);
    return Promise.resolve(obj);
};

module.exports.updateById = (id, obj) => {
    const index = db.findIndex(obj => obj.id === id);
    db.splice(index, 1, obj);
    return Promise.resolve();
};

module.exports.deleteById = id => {
    const index = db.findIndex(obj => obj.id === id);
    db.splice(index, 1);
    return Promise.resolve();
};