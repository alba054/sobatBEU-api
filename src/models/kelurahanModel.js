const mongoose = require('mongoose');
const { bufferCommands, bufferTimeoutMS, optimisticConcurrency } = require('../config');

const code = {
  type: String,
  unique: true,
  required: [true, 'Provide Code'],
  validate: {
    validator: (v) => /\d{9,11}/.test(v),
    message: 'code is not valid',
  },
};

const name = {
  type: String,
  unique: true,
  required: [true, 'Provide Name'],
};

const numUsers = {
  type: Number,
  default: 0,
};

const address = {
  type: String,
  required: [true, 'Provide Address'],
};

const postCode = {
  type: String,
  required: [true, 'Provide Postcode'],
  validate: {
    validator: (v) => /\d{4,6}/.test(v),
    message: 'postcode is not valid',
  },
};

const area = {
  type: Number,
};

const website = {
  type: String,
};

const kelurahanSchema = mongoose.Schema({
  code,
  name,
  numUsers,
  address,
  postCode,
  area,
  website,
});

kelurahanSchema.set({
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
});

const kelurahanModel = mongoose.model('kelurahan', kelurahanSchema);

module.exports = kelurahanModel;
