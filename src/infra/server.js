const express = require('express');
const path = require('path');
const apiRoutes = require('../adapters/api/routes');

function createServer() {
    const app = express();

    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../adapters/web')));

    app.use('/', apiRoutes);

    return app;
}

module.exports = { createServer };