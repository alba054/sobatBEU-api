// import local modules
const User = require('../instances/users');

const loginHandler = async (request, h) => {
  const { phone, password } = request.headers;
  const user = new User(phone, password);

  try {
    const token = await user.login();
    console.log(token);
    const res = { status: 'success', message: 'user is valid', res: token };

    const response = h.response(res);

    return response;
  } catch (err) {
    if (err.message === 'phone number is not registered') {
      return { status: 'failed', message: err.message };
    }
    return { status: 'failed', message: err.message };
  }
};

module.exports = loginHandler;
