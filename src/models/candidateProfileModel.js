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

// as reference for web admin
const candidateNum = {
  type: String,
  required: [true, 'harus ada'],
  unique: true,
};

const name = {
  type: String,
  required: [true, 'nama kandidat harus ada'],
};

const gender = {
  type: String,
  enum: {
    values: ['male', 'female'],
    message: '{VALUE} is not supported (male or female)',
  },
  // lowercase: true,
  required: [true, 'jenis kelamin tidak boleh kosong'],
};

const nik = {
  type: String,
  required: [true, 'NIK tidak boleh kosong'],
  unique: true,
};

// if candidates are pair (gubernur, walikota)
const coName = {
  type: String,
  default: '-',
};

const coGender = {
  type: String,
  enum: {
    values: ['male', 'female'],
    message: '{VALUE} is not supported (male or female)',
  },
};

const coNik = {
  type: String,
  default: '-',
};

const party = {
  type: String,
  default: '-',
};

const level = {
  type: String,
  enum: {
    values: ['walikota', 'gubernur', 'dprd', 'dpr ri'],
    message: '{VALUE} tidak sesuai',
  },
  required: [true, 'level harus diisi'],
};

const provinceId = { type: String };
const kabupatenCode = {
  type: String,
  validate: {
    validator: (v) => /\d{3,4}-\d{3,4}/.test(v),
    message: 'kode kabupaten tidak valid',
  },
};
// const kecamatanCode = {
//   type: String,
//   validate: {
//     validator: (v) => /\d{3,4}-\d{3,4}-\d{4,5}/.test(v),
//     message: 'kode kecamatan tidak valid',
//   },
// };
// const kelurahanCode = {
//   type: String,
//   validate: {
//     validator: (v) => /\d{3,4}-\d{3,4}-\d{4,5}-\d{4,5}/.test(v),
//     message: 'kode kelurahan tidak valid',
//   },
// };


const candidateProfileSchema = mongoose.Schema({
  name,
  gender,
  nik,
  coName,
  coGender,
  coNik,
  party,
  candidateNum,
  level,
  provinceId,
  kabupatenCode,
  createdAt: String,
  updatedAt: String,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    currentTime: () => new Date(Date.now()).toString(),
  },
});

candidateProfileSchema.post('save', handleError);
// candidateProfileSchema.post('save', handleRequiredField);

// options for schema
candidateProfileSchema.set({
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
  autoCreate,
});

const CandidateProfileModel = mongoose.model('candidate_profile', candidateProfileSchema);

module.exports = CandidateProfileModel;
