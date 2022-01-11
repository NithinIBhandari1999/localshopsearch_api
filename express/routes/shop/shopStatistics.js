const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const {
	getDashboardStatistics
} = require('../../controller/shop/shopStatistics');

const verifyJwt = require('../../middleware/verifyJwt');
const protectedRouteUser = require('../../middleware/protectedRouteUser');
const shopBelongUser = require('../../middleware/shopBelongUser');
const checkRequestValidationMiddleware = require('../../middleware/checkRequestValidationMiddleware');

const customInputValidations = require('../../utils/customInputValidations');

router.post(
	'/getDashboardStatistics/:paramsShopId',
	[
		param('paramsShopId').custom(val => {
			const err = customInputValidations.isInputValidMongodbId(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		})
	],
	checkRequestValidationMiddleware,
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	getDashboardStatistics
);

module.exports = router;
