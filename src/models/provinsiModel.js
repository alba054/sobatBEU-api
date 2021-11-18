// import 3rd party modules
const mongoose = require('mongoose');
// import local modules
const { bufferCommands, bufferTimeoutMS, optimisticConcurrency } = require('../config/schema');
const handleError = require('./utils');

const provinceId = { type: String, unique: true };
const provinceName = { type: String };

const provinceSchema = mongoose.Schema({ provinceId, provinceName });

provinceSchema.set({
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
});

provinceSchema.post('save', handleError);

const ProvinceModel = mongoose.model('provinsi', provinceSchema);

module.exports = ProvinceModel;
