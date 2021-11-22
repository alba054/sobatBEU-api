// import 3rd party modules
const jwt = require('jsonwebtoken');
// import local modules
const Kabupaten = require('../instances/kabupaten');

const addKabupatenHandler = async (request, h) => {
  const { token } = request.headers;
  const { provinceId } = request.params;
  const {
    provinceName,
    kabupatenId,
    kabupatenCode,
    kabupatenName,
  } = request.payload;
  let response = null;
  let decoded = null;
  if (typeof provinceId === 'undefined'
    || typeof provinceName === 'undefined'
    || typeof kabupatenId === 'undefined'
    || typeof kabupatenCode === 'undefined'
    || typeof kabupatenName === 'undefined') {
    response = h.response({ status: 'failed', message: 'payload tidak lengkap' });
    response.code(400);

    return response;
  }

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];
    if (sub === process.env.SUB_ADMIN) {
      const kabupaten = await Kabupaten.addKabupaten(
        provinceId,
        provinceName,
        kabupatenId,
        kabupatenCode,
        kabupatenName,
      );
      response = h.response({ status: 'success', message: 'menambah kabupaten baru', res: kabupaten });
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

const getKabupatenByIdHandler = async (request, h) => {
  const { token } = request.headers;
  const { provinceId } = request.params;
  let response = null;
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];
    if (sub === process.env.SUB_ADMIN) {
      const kabupaten = await Kabupaten.getKabupatenById(provinceId);
      response = h.response({ status: 'success', message: 'valid', res: kabupaten });
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

module.exports = { addKabupatenHandler, getKabupatenByIdHandler };

