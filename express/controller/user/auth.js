const FormatResponse = require('response-format');

const { setTokenCookie } = require('../../utils/commonFunction');
const { generateUserJwtToken } = require('../../utils/jwtFunction');
const { hashPassword, comparePassword } = require('../../utils/passwordHashFunction');
const { getAuthStatus } = require('../user/validateSession');

// Models
const User = require('../../models/user/User');

exports.register = async (req, res) => {
    try {
        const { password, email, name } = req.body;

        const resultUserInfo = await User.findOne({
            email,
        });

        if (resultUserInfo) {
            return res.status(400).json(FormatResponse.badRequest('Account already exist.', {}));
        }

        const passwordHash = await hashPassword(password);

        const newShop = await User.create({
            name,
            email,
            password: passwordHash
        });

        let jwtToken = '';
        jwtToken = await generateUserJwtToken(newShop._id, email, 'user');
        setTokenCookie(res, jwtToken);

        const authStatus = await getAuthStatus('user', newShop);

        return res.status(200).json(
            FormatResponse.success('Account Created Successfully', {
                authStatus,
            })
        );
    } catch (error) {
        return res.status(400).json(FormatResponse.badRequest(error.message, {}));
    }
};

exports.login = async (req, res) => {
    try {
        const { password, email } = req.body;

        const resultUserInfo = await User.findOne({
            email,
        }).select('+password');

        if (!resultUserInfo) {
            return res.status(400).json(FormatResponse.badRequest('Account does not exist.', {}));
        }

        const compareResult = await comparePassword(password, resultUserInfo.password);

        if (compareResult) {
            let jwtToken = '';
            jwtToken = await generateUserJwtToken(resultUserInfo._id, email, 'user');
            setTokenCookie(res, jwtToken);

            const authStatus = await getAuthStatus('user', resultUserInfo);

            return res.status(200).json(
                FormatResponse.success('Login Successfully', {
                    authStatus,
                })
            );
        } else {
            setTokenCookie(res, '');
            return res.status(400).json(FormatResponse.success('Password is wrong.', {}));
        }
    } catch (error) {
        return res.status(400).json(FormatResponse.badRequest(error.message, {}));
    }
};

exports.logout = async (req, res) => {
    try {

        setTokenCookie(res, '');
        return res.status(200).json(FormatResponse.success('Logout Successful.', {}));

    } catch (error) {
        return res.status(400).json(FormatResponse.badRequest('Unexpected Error while performing Logout Action', {}));
    }
};