const express = require('express');
const { param } = require('express-validator');

const {
  searchProduct,
  getShopInfoById
} = require('../../controller/global/globalShop');

const checkRequestValidationMiddleware = require('../../middleware/checkRequestValidationMiddleware');
const verifyJwtNoRedirect = require('../../middleware/verifyJwtNoRedirect');

const customInputValidations = require('../../utils/customInputValidations');

const router = new express.Router();

router.post(
  '/searchProduct',
  searchProduct
);

router.get(
  '/getShopInfoById/:uniqueUrl',
  [
    param('uniqueUrl').custom(val => {
      const err = customInputValidations.isInputEmpty(val);
      if (err !== '') {
        throw new Error(err);
      }
      return true;
    })
  ],
  checkRequestValidationMiddleware,
  verifyJwtNoRedirect,
  getShopInfoById
);

module.exports = router;
