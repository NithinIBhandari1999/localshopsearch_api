// Imports
const express = require('express');

const Router = express.Router();

Router.use( '/fileUpload' , require('./fileUpload'));

module.exports = Router;