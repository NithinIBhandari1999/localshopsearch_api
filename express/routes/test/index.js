const express = require('express');

const router = new express.Router();

const test = require('./test');
const generateDummyShop = require('./generateDummyShop');

router.use('/generateDummyShop', generateDummyShop);
router.use('/test' , test);

module.exports = router;
