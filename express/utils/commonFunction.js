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

const exportObj = {
  setTokenCookie,
  trimObject,
  filterInclude
};

module.exports = exportObj;