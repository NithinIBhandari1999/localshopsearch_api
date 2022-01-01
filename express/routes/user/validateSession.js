const express = require("express");
const router = express.Router();

const { validateSession } = require('../../controller/user/validateSession');
const verifyJwt = require('../../middleware/verifyJwt');

router.post('/validateSession', verifyJwt, validateSession);

module.exports = router;
