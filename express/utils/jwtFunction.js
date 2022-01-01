const envConstant = require('../config/envConstant');
const jwt = require('jsonwebtoken');

const generateJwtToken = async (token) => {
    let tokenReturn = '';
    try {
        tokenReturn = await jwt.sign(token, envConstant.jwtSectetKeyValue);
    } catch (error) {
        console.error(error);
    }
    return tokenReturn;
};

const generateUserJwtToken = async (userId, email, userType) => {
    const jwtObj = {
        userId,
        email,
        userType
    };

    let token = '';
    try {
        token = await generateJwtToken(jwtObj);
    } catch (error) {
        console.error(error);
    }
    return token;
};

const verifyUserJwtToken = async (token) => {
    try {
        return jwt.verify(token, envConstant.jwtSectetKeyValue);
    } catch (error) {
        console.error(error);
        return false;
    }
};

const exportObj = {
    generateJwtToken,
    generateUserJwtToken,
    verifyUserJwtToken
};

module.exports = exportObj;