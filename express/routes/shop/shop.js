const express = require('express');
const router = express.Router();

const {
	insertOne,
	getAll,
	getById,
	updateById,
	deleteById
} = require('../../controller/shop/shop');
const verifyJwt = require('../../middleware/verifyJwt');
const protectedRouteUser = require('../../middleware/protectedRouteUser');
const shopBelongUser= require('../../middleware/shopBelongUser');

router.post(
	'/insertOne',
	verifyJwt,
	protectedRouteUser,
	insertOne
);

router.get(
	'/getAll',
	verifyJwt,
	protectedRouteUser,
	getAll
);

router.get(
	'/getById/:paramsShopId',
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	getById
);

router.put(
	'/updateById/:paramsShopId',
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	updateById
);

router.post(
	'/deleteById/:paramsShopId',
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	deleteById
);

module.exports = router;
