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
const candidateNum = {
  type: String,
  required: [true, 'candidateNum harus diisi'],
};

const webAdminSchema = mongoose.Schema({
  username,
  password,
  candidateNum,
  createdAt: String,
  updatedAt: String,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    currentTime: () => new Date(Date.now()).toString(),
  },
  toJSON: { virtuals: true },
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

// virtual populate
webAdminSchema.virtual('candidate', {
  ref: 'candidate_profile',
  localField: 'candidateNum',
  foreignField: 'candidateNum',
});

const WebAdminModel = mongoose.model('web_admin', webAdminSchema);

module.exports = WebAdminModel;
