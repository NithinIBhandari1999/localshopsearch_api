const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
	return bcrypt.hashSync(password, 12);
};

const comparePassword = (dbPassword, userInputPassword) => {
	return bcrypt.compare(dbPassword, userInputPassword);
};

const exportObj = {
	hashPassword,
	comparePassword,
};

module.exports = exportObj;
