const mongoose = require('mongoose');
const { bufferCommands, bufferTimeoutMS, optimisticConcurrency } = require('../config/schema');

const provinceId = { type: String };
const provinceName = { type: String };
const kabupatenId = { type: String };
const kabupatenCode = {
  type: String,
  validate: {
    validator: (v) => /\d{3,4}-\d{3,4}/.test(v),
    message: 'kode kabupaten tidak valid',
  },
};
const kabupatenName = { type: String };
const kecamatanId = { type: String };
const kecamatanCode = {
  type: String,
  validate: {
    validator: (v) => /\d{3,4}-\d{3,4}-\d{4,5}/.test(v),
    message: 'kode kecamatan tidak valid',
  },
};
const kecamatanName = { type: String };
const kelurahanId = { type: String };
const kelurahanCode = {
  type: String,
  validate: {
    validator: (v) => /\d{3,4}-\d{3,4}-\d{4,5}-\d{4,5}/.test(v),
    message: 'kode kelurahan tidak valid',
  },
};
const kelurahanName = { type: String };

const kelurahanSchema = mongoose.Schema({
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
});

kelurahanSchema.set({
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
});

const kelurahanModel = mongoose.model('kelurahan', kelurahanSchema);

module.exports = kelurahanModel;
