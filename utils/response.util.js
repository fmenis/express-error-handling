'use strict';

class Response {
    constructor(data = {}) {
        this.timestamp = new Date();
        this.success = data.success || false;
        this.status = data.status || 200;
        this.error = data.error || {};
        this.data = data.data || {};
    }
}

module.exports = Response;