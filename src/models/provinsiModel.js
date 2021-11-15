const mongoose = require('mongoose');
const { bufferCommands, bufferTimeoutMS, optimisticConcurrency } = require('../config/schema');

const provinceId = { type: String, unique: true };
const provinceName = { type: String };

const provinceSchema = mongoose.Schema({ provinceId, provinceName });

provinceSchema.set({
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
});

const provinceModel = mongoose.model('provinsi', provinceSchema);

module.exports = provinceModel;
