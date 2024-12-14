const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const { auth } = require('../middlewares/auth');
const cors = require('cors');

function expressConfigs(app) {
    // TODO delete two rows if not works
    app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
    app.use(express.json());
    app.use(express.static('./src/static'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(auth);

}

module.exports = expressConfigs;