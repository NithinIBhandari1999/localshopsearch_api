const express = require('express');

const router = new express.Router();

const user = require('./user');
const auth = require('./auth');
const validateSession = require('./validateSession');

router.use('/auth', auth);
router.use('/user', user);
router.use('/validateSession', validateSession);

module.exports = router;
