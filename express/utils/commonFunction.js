const requestIp = require('request-ip');

const setTokenCookie = (res, token) => {
  const expiryDate = new Date(Number(new Date()) + 31536000000);

  res.cookie('jwtToken', token, {
    expires: expiryDate,
    httpsOnly: true,
    sameSite: 'none',
    secure: true,
  });
};

const trimObject = (obj) => {
  Object.keys(obj).map((key) => {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].trim();
    }
    return '';
  });
  return obj;
};

const filterInclude = (obj, restricted) => {
  const newObj = {};

  Object.keys(obj).forEach(el => {
    if (restricted.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const replaceAll = (str, match, replacement) => {
  return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
};

const getIpAddress = (req) => {
  const ip = requestIp.getClientIp(req);
  return ip;
};

const exportObj = {
  setTokenCookie,
  trimObject,
  filterInclude,
  replaceAll,
  getIpAddress
};

exports.replaceAll = replaceAll;

module.exports = exportObj;