// import 3rd party modules
const jwt = require('jsonwebtoken');
// import local modules
const Kelurahan = require('../instances/kelurahan');

const addKelurahanHandler = async (request, h) => {
  const { token } = request.headers;
  const { provinceId, kabupatenId, kecamatanId } = request.params;
  const {
    provinceName,
    kabupatenName,
    kecamatanName,
    kelurahanId,
    kelurahanCode,
    kelurahanName,
  } = request.payload;

  let response = null;
  let decoded = null;

  if (typeof provinceId === 'undefined'
    || typeof provinceName === 'undefined'
    || typeof kabupatenId === 'undefined'
    || typeof kabupatenName === 'undefined'
    || typeof kecamatanId === 'undefined'
    || typeof kecamatanName === 'undefined'
    || typeof kelurahanId === 'undefined'
    || typeof kelurahanCode === 'undefined'
    || typeof kelurahanName === 'undefined') {
    response = h.response({ status: 'failed', message: 'payload tidak lengkap' });
    response.code(400);

    return response;
  }

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];
    if (sub === process.env.SUB_ADMIN) {
      const kabupatenCode = `${provinceId}-${kabupatenId}`;
      const kecamatanCode = `${provinceId}-${kabupatenId}-${kecamatanId}`;
      const kelurahan = await Kelurahan.addKelurahan(
        provinceId,
        provinceName,
        kabupatenId,
        kabupatenCode,
        kabupatenName,
        kecamatanId,
        kecamatanCode,
        kecamatanName,
        kelurahanId,
        kelurahanCode,
        kelurahanName,
      );
      response = h.response({ status: 'success', message: 'menambah kabupaten baru', res: kelurahan });
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

const getKelurahanByCodeHandler = async (request, h) => {
  const { token } = request.headers;
  const { provinceId, kabupatenId, kecamatanId } = request.params;
  const kecamatanCode = `${provinceId}-${kabupatenId}-${kecamatanId}`;
  let response = null;
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];
    if (sub === process.env.SUB_ADMIN) {
      const kelurahan = await Kelurahan.getKelurahanByCode(kecamatanCode);
      response = h.response({ status: 'success', message: 'valid', res: kelurahan });
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

module.exports = { addKelurahanHandler, getKelurahanByCodeHandler };

