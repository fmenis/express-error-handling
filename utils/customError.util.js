'use strict';

class CustomError {
    constructor(code, data) {
        this.code = code || null;
        this.data = data || {};
    }
}

module.exports = CustomError;