const express = require('express');

const router = new express.Router();

const shop = require('./shop');

router.use('/shop', shop);

module.exports = router;
