const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const { register, login, logout } = require('../../controller/user/auth');

const checkRequestValidationMiddleware = require('../../middleware/checkRequestValidationMiddleware');

const customInputValidations = require('../../utils/customInputValidations');

router.post(
    '/login',
    [
        body('email').custom(val => {
            const err = customInputValidations.isInputEmailValid(val);
            if (err !== '') {
                throw new Error(err);
            }
            return true;
        }),
        body('password').custom(val => {
            const err = customInputValidations.isInputEmpty(val);
            if (err !== '') {
                throw new Error(err);
            }
            return true;
        })
    ],
    checkRequestValidationMiddleware,
    login
);

router.post(
    '/register',
    [
        body('name').custom(val => {
            const err = customInputValidations.isInputEmpty(val);
            if (err !== '') {
                throw new Error(err);
            }
            return true;
        }),
        body('email').custom(val => {
            const err = customInputValidations.isInputEmailValid(val);
            if (err !== '') {
                throw new Error(err);
            }
            return true;
        }),
        body('password').custom(val => {
            const err = customInputValidations.isInputEmpty(val);
            if (err !== '') {
                throw new Error(err);
            }
            return true;
        })
    ],
    checkRequestValidationMiddleware,
    register
);

router.post(
    '/logout',
    logout
);

module.exports = router;
