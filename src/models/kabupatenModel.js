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
  unique: true,
  validate: {
    validator: (v) => /\d{3,4}-\d{3,4}/.test(v),
    message: 'kode kabupaten tidak valid',
  },
};
const kabupatenName = { type: String };

const kabupatenSchema = mongoose.Schema({
  provinceId,
  provinceName,
  kabupatenId,
  kabupatenCode,
  kabupatenName,
});

kabupatenSchema.set({
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
});

kabupatenSchema.post('save', handleError);

const KabupatenModel = mongoose.model('kabupaten', kabupatenSchema);

module.exports = KabupatenModel;
