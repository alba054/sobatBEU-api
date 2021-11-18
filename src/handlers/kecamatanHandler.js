// import 3rd party modules
const jwt = require('jsonwebtoken');
// import local modules
const Kecamatan = require('../instances/kecamatan');

const addKecamatanHandler = async (request, h) => {
  const { token } = request.headers;
  const { provinceId, kabupatenId } = request.params;
  const {
    provinceName,
    kabupatenName,
    kecamatanId,
    kecamatanCode,
    kecamatanName,
  } = request.payload;

  let response = null;
  let decoded = null;

  if (typeof provinceId === 'undefined'
    || typeof provinceName === 'undefined'
    || typeof kabupatenId === 'undefined'
    || typeof kabupatenName === 'undefined'
    || typeof kecamatanId === 'undefined'
    || typeof kecamatanCode === 'undefined'
    || typeof kecamatanName === 'undefined') {
    response = h.response({ status: 'failed', message: 'payload tidak lengkap' });
    response.code(400);

    return response;
  }

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];
    if (sub === 'sysadmin') {
      const kabupatenCode = `${provinceId}-${kabupatenId}`;
      const kecamatan = await Kecamatan.addKecamatan(
        provinceId,
        provinceName,
        kabupatenId,
        kabupatenCode,
        kabupatenName,
        kecamatanId,
        kecamatanCode,
        kecamatanName,
      );
      response = h.response({ status: 'success', message: 'menambah kabupaten baru', res: kecamatan });
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

const getKecamatanByCodeHandler = async (request, h) => {
  const { token } = request.headers;
  const { provinceId, kabupatenId } = request.params;
  const kabupatenCode = `${provinceId}-${kabupatenId}`;
  let response = null;
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];
    if (sub === 'sysadmin') {
      const kecamatan = await Kecamatan.getKecamatanByCode(kabupatenCode);
      response = h.response({ status: 'success', message: 'valid', res: kecamatan });
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

module.exports = { addKecamatanHandler, getKecamatanByCodeHandler };

