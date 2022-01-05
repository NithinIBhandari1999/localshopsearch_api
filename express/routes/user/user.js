const express = require('express');
const router = express.Router();

const { getProfileInfo, updateProfileInfo } = require('../../controller/user/user');

const verifyJwt = require('../../middleware/verifyJwt');
const protectedRouteUser = require('../../middleware/protectedRouteUser');

router.get(
    '/getProfileInfo',
    verifyJwt,
    protectedRouteUser,
    getProfileInfo
);

router.post(
    '/updateProfileInfo',
    verifyJwt,
    protectedRouteUser,
    updateProfileInfo
);

module.exports = router;
