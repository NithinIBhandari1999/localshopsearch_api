const express = require('express');

const router = new express.Router();

const globalShop = require('./globalShop');

router.use('/shop', globalShop);

module.exports = router;
