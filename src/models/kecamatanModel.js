// import 3rd party modules
const mongoose = require('mongoose');
// import local modules
const { bufferCommands, bufferTimeoutMS, optimisticConcurrency } = require('../config/schema');
const handleError = require('./utils');

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
  unique: true,
};
const kecamatanName = { type: String };

const kecamatanSchema = mongoose.Schema({
  provinceId,
  provinceName,
  kabupatenId,
  kabupatenCode,
  kabupatenName,
  kecamatanId,
  kecamatanCode,
  kecamatanName,
});

kecamatanSchema.set({
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
});

kecamatanSchema.post('save', handleError);

const KecamatanModel = mongoose.model('kecamatan', kecamatanSchema);

module.exports = KecamatanModel;
