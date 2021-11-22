// import 3rd party modules
const jwt = require('jsonwebtoken');
// import local modules
const WebAdmin = require('../instances/webAdmin');

const addWebAdminHandler = async (request, h) => {
  const { token } = request.headers;
  const profile = request.payload;

  let response = null;
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];

    if (sub === process.env.SUB_ADMIN) {
      const webAdmin = await WebAdmin.addWebAdmin(profile);
      response = h.response({ status: 'success', message: 'menambah web admin baru', res: webAdmin });
      response.code(201);

      return response;
    }

    response = h.response({ status: 'failed', message: 'anda bukan admin' });
    response.code(401);

    return response;

  } catch (err) {
    response = h.response({ status: 'failed', message: err.message });
    response.code(400);

    return response;
  }
};

const getWebAdminByCandidate = async (request, h) => {
  const { token } = request.headers;
  const { candidateNum } = request.params;

  let response = null;
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];
    if (sub === process.env.SUB_ADMIN) {
      const webAdmins = await WebAdmin.getWebAdminByCandidate(candidateNum);
      response = h.response({ status: 'success', message: 'valid', res: webAdmins });
      response.code(200);

      return response;
    }

    response = h.response({ status: 'failed', message: 'anda bukan admin' });
    response.code(401);

    return response;

  } catch (err) {
    response = h.response({ status: 'failed', message: err.message });
    response.code(400);

    return response;
  }
};

module.exports = { addWebAdminHandler, getWebAdminByCandidate };
