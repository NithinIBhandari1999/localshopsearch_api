const express = require('express');

const router = new express.Router();

const shop = require('./shop');
const shopStatistics = require('./shopStatistics');

router.use('/shop', shop);
router.use('/shopStatistics', shopStatistics);

module.exports = router;
