'use strict';

const express = require('express');
const userController = require('./user.controller');
const validator = require('./user.validator');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', validator({ endpoint: 'getUserById' }), userController.getUserById);
router.post('/', validator({ endpoint: 'createUser' }), userController.createUser);
router.put('/:id', validator({ endpoint: 'updateUser' }), userController.updateUser);
router.delete('/:id', validator({ endpoint: 'deleteUserById' }), userController.deleteUserById);

module.exports = router;