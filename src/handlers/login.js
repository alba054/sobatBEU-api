// import 3rd party modules
const jwt = require('jsonwebtoken');
// import local modules
const User = require('../instances/users');
const WebAdmin = require('../instances/webAdmin');

const mobileLogin = async (phone, password) => {
  const user = new User(phone, password);
  try {
    const token = await user.login();

    return [{ status: 'success', message: 'user is valid', res: token }, 200];
  } catch (err) {
    return [{ status: 'failed', message: err.message }, 401];
  }
};

const webAdminLogin = async (username, password) => {
  const webAdmin = new WebAdmin(username, password);

  try {
    const token = await webAdmin.login();

    return [{ status: 'success', message: 'admin is valid', res: token }, 200];
  } catch (err) {
    return [{ status: 'failed', message: err.message }, 401];
  }
};

const sysadminLogin = (username, password) => {
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      {
        sub: `${process.env.SUBJECT_URI}${process.env.SUB_ADMIN}`,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
        iat: Math.floor(Date.now() / 1000),
      }, process.env.SECRET_KEY,
    );

    return [{ status: 'success', message: 'admin is valid', res: token }, 200];
  }

  return [{ status: 'failed', message: 'admin is not valid' }, 401];
};

const loginHandler = async (request, h) => {
  const { mode } = request.query;
  let response = null;
  let res = null;
  let phone = null;
  let username = null;
  let password = null;

  switch (mode) {
    case 'mobile':
      phone = request.headers.phone;
      password = request.headers.password;
      res = await mobileLogin(phone, password);
      response = h.response(res[0]);
      response.code(res[1]);
      break;
    case 'web':
      username = request.headers.username;
      password = request.headers.password;
      res = await webAdminLogin(username, password);
      response = h.response(res[0]);
      response.code(res[1]);
      break;
    default:
      username = request.headers.username;
      password = request.headers.password;
      res = sysadminLogin(username, password);
      response = h.response(res[0]);
      response.code(res[1]);
      break;
  }

  return response;
};

module.exports = loginHandler;
