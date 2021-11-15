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
  validate : {
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
const role = { type: String, default: 'admin' };
