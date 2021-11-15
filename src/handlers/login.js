// import local modules
const User = require('../instances/users');

const loginHandler = async (request, h) => {
  const { phone, password } = request.headers;
  const user = new User(phone, password);
  let response = null;
  try {
    const token = await user.login();
    const res = { status: 'success', message: 'user is valid', res: token };
    response = h.response(res);
    response.code(200);

    return response;
  } catch (err) {
    if (err.message === 'phone number is not registered') {
      response = h.response({ status: 'failed', message: err.message });
      response.code(401);
      return response;
    }

    response = h.response({ status: 'failed', message: err.message });
    response.code(401);
    return response;
  }
};

module.exports = loginHandler;
