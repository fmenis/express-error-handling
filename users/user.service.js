'use strict';

const db = require('../utils/db.util');
const shortid = require('shortid');
const logger = require('../utils/logger.util');
const ClientError = require('../utils/classes/clientError.util');


module.exports.getAllUsers = async () => {
    let users = await db.getAll();  
    //simulate work on the db results
    users = users.map(user => _deleteObjProps(user, ['created_at', 'is_deleted', 'updated_at',]));
    return users;
};


module.exports.getUserById = async id => {
    let user = await _getUser(id);
    user = _deleteObjProps(user, ['created_at', 'is_deleted', 'updated_at']);
    return user;
};


module.exports.createUser = async (name, age) => {
    const new_user = {
        id: shortid.generate(),
        name,
        age,
        created_at: new Date(),
        is_deleted: false
    };

    await db.create(new_user);
};


module.exports.updateUser = async (id, name, age) => {
    const user = await _getUser(id);
    user.name = name;
    user.age = age;
    user.updated_at = new Date();

    await db.updateById(id, user);
};


module.exports.deleteUserById = async id => {
    await _getUser(id)
    await db.deleteById(id);
};


// ----------------- HELPERS -----------------

const _getUser = async id => {
    const user = await db.getById(id);
    if (!user) {
        logger.error(new Error(`[Users] user with id ${id} not found`));
        throw new ClientError('not_found', { resource: 'User', id: id });
    }
    return user;
};


const _deleteObjProps = (obj, props) => {
    props.forEach(key => {
        delete obj[key];
    });
    return obj;
};