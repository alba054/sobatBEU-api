const mongoose = require('mongoose');
const {
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
  autoCreate,
} = require('../config/schema');

const kecamatanSchema = new mongoose.Schema({
  code: {
    type: String,
    validate: {
      validator: (v) => /\d{5,7}/.test(v),
      message: 'kecamatan code `is not valid',
    },
  },
  name: { type: String, required: [true, 'Provide Name'] },
});

kecamatanSchema.set({
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
  autoCreate,
});

const kecamatanModel = mongoose.model('kecamatan', kecamatanSchema);

module.exports = kecamatanModel;
