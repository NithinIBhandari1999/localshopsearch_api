const envConstant = {
    mongoURI: process.env.mongoURI,
    jwtSectetKeyValue: process.env.jwtSectetKeyValue,
    NODE_ENV: process.env.NODE_ENV,
    BACKEND_URL: process.env.BACKEND_URL,

    IMAGEKIT_PUBLICKEY: process.env.IMAGEKIT_PUBLICKEY,
    IMAGEKIT_PRIVATEKEY: process.env.IMAGEKIT_PRIVATEKEY,
    IMAGEKIT_ID: process.env.IMAGEKIT_ID,
};

module.exports = envConstant;