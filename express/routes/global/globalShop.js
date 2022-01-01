const express = require('express');

const {
  searchProduct,
  getShopInfoById
} = require('../../controller/global/globalShop');

const router = new express.Router();

router.post(
  '/searchProduct',
  searchProduct
);

router.get(
  '/getShopInfoById/:uniqueUrl',
  getShopInfoById
);

module.exports = router;
