const express = require('express');

const {
  generateDummyShop
} = require('../../controller/test/generateDummyShop');

const router = new express.Router();

router.get(
  '/generateDummyShop',
  generateDummyShop
);

module.exports = router;
