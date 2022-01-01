const express = require('express');

const {
  getImageKitAuth
} = require('../../controller/commmon/fileUpload');

const router = new express.Router();

router.get(
  '/getImageKitAuth',
  getImageKitAuth
);

module.exports = router;
