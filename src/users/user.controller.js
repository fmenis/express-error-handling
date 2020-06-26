'use strict';

const userService = require('./user.service');


module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};


module.exports.getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);
        res.json(user);
    } catch (error) {
        next(error);
    }
};


module.exports.createUser = async (req, res, next) => {
    try {
        const { name, age } = req.body;
        const user = await userService.createUser(name, age);
        res.json(user);

    } catch (error) {
        next(error);
    }
};


module.exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, age } = req.body; 
        const user = await userService.updateUser(id, name, age);
        res.json(user);

    } catch (error) {
        next(error);
    }
};


module.exports.deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        await userService.deleteUserById(id);
        res.json();

    } catch (error) {
        next(error);
    }
};