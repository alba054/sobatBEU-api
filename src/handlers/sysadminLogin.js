// import 3rd party modules
const jwt = require('jsonwebtoken');

const adminLoginHandler = async (request, h) => {
  const { username, password } = request.headers;
  let response = null;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      {
        sub: `${process.env.SUBJECT_URI}sysadmin`,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
        iat: Math.floor(Date.now() / 1000),
      }, process.env.SECRET_KEY,
    );
    const res = { status: 'success', message: 'admin is valid', res: token };
    response = h.response(res);
    response.code(200);

    return response;
  }

  response = h.response({ status: 'failed', message: 'admin is not valid' });
  response.code(401);

  return response;
};

module.exports = adminLoginHandler;
