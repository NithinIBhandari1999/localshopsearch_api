const express = require('express');
const router = express.Router();

const {
	insertOne,
	getAll,
	getById,
	updateById,
	deleteById
} = require('../../controller/product/product');

const verifyJwt = require('../../middleware/verifyJwt');
const protectedRouteUser = require('../../middleware/protectedRouteUser');
const shopBelongUser = require('../../middleware/shopBelongUser');

router.post(
	'/insertOne/:paramsShopId',
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	insertOne
);

router.get(
	'/getAll/:paramsShopId',
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	getAll
);

router.get(
	'/getById/:paramsShopId/:paramsProductId',
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	getById
);

router.put(
	'/updateById/:paramsShopId/:paramsProductId',
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	updateById
);

router.delete(
	'/deleteById/:paramsShopId/:paramsProductId',
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	deleteById
);

module.exports = router;
