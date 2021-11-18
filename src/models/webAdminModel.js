// import 3rd party modules
const mongoose = require('mongoose');
// import local modules
const {
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
  autoCreate,
} = require('../config/schema');

const handleError = require('./utils');

const username = {
  type: String,
  required: [true, 'username tidak boleh kosong'],
  unique: true,
  validate: {
    validator: (v) => /.{4,}/.test(v),
    message: 'username minimal 4 karakter',
  },
};
const password = {
  type: String,
  minLength: 59,
  maxLength: 61,
  required: [true, 'password tidak boleh kosong'],
};
const level = {
  type: String,
  enum: {
    values: ['walikota', 'gubernur', 'dprd', 'dpr ri'],
    message: '{VALUE} tidak sesuai',
  },
  required: [true, 'level tidak valid'],
};
const provinceId = { type: String };
const kabupatenCode = {
  type: String,
  validate: {
    validator: (v) => /\d{3,4}-\d{3,4}/.test(v),
    message: 'kode kabupaten tidak valid',
  },
};
const kecamatanCode = {
  type: String,
  validate: {
    validator: (v) => /\d{3,4}-\d{3,4}-\d{4,5}/.test(v),
    message: 'kode kecamatan tidak valid',
  },
};
const kelurahanCode = {
  type: String,
  validate: {
    validator: (v) => /\d{3,4}-\d{3,4}-\d{4,5}-\d{4,5}/.test(v),
    message: 'kode kelurahan tidak valid',
  },
};
// identify admin
const calegNum = {
  type: Number,
  required: [true, 'harus ada'],
  unique: true,
};

const webAdminSchema = mongoose.Schema({
  username,
  password,
  level,
  provinceId,
  kabupatenCode,
  kecamatanCode,
  kelurahanCode,
  calegNum,
});

webAdminSchema.post('save', handleError);
// webAdminSchema.post('save', handleRequiredField);

// options for schema
webAdminSchema.set({
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
  autoCreate,
});

const webAdminModel = mongoose.model('web_admin', webAdminSchema);

module.exports = webAdminModel;
