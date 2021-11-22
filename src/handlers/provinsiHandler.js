// import 3rd party modules
const jwt = require('jsonwebtoken');
// import local modules
const Provinsi = require('../instances/provinsi');

const addProvinceHandler = async (request, h) => {
  const { token } = request.headers;
  const { provinceId, provinceName } = request.payload;
  let response = null;
  let decoded = null;
  if (typeof provinceId === 'undefined' || typeof provinceName === 'undefined') {
    response = h.response({ status: 'failed', message: 'payload tidak lengkap' });
    response.code(400);

    return response;
  }

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];

    if (sub === process.env.SUB_ADMIN) {
      const provinsi = await Provinsi.addProvince(provinceId, provinceName);
      response = h.response({ status: 'success', message: 'menambah provinsi baru', res: provinsi });
      response.code(201);

      return response;
    }

    response = h.response({ status: 'failed', message: 'anda bukan admin' });
    response.code(401);

    return response;

  } catch (err) {
    response = h.response({ status: 'failed', message: err.message });

    return response;
  }
};

const getAllProvincesHandler = async (request, h) => {
  const { token } = request.headers;
  let response = null;
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];

    if (sub === process.env.SUB_ADMIN) {
      const provinsi = await Provinsi.getAllProvinces();
      response = h.response({ status: 'success', message: 'valid', res: provinsi });
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

module.exports = { addProvinceHandler, getAllProvincesHandler };

