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

const fullName = {
  firstName: { type: String, required: [true, 'Provide First Name'] },
  lastName: { type: String },
};

const birth = {
  birthplace: { type: String, required: [true, 'Provide Birthplace'] },
  year: { type: Number, required: [true, 'Provide Year'] },
  month: {
    type: Number, min: 1, max: 12, required: [true, 'Provide Month [1-12]'],
  },
  day: {
    type: Number, min: 1, max: 31, required: [true, 'Provide Day [1-31]'],
  },
};

const gender = {
  type: String,
  enum: {
    values: ['male', 'female'],
    message: '{VALUE} is not supported',
  },
  // lowercase: true,
  required: [true, 'Provide gender'],
};

const cardAddress = {
  address: { type: String, required: [true, 'Provide address'] },
  kelurahan: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  rt: { type: Number, default: 0 },
  rw: { type: Number, default: 0 },
};

const phoneNumber = {
  type: String,
  required: [true, 'Provide Phone Number'],
  validate: {
    validator: (v) => /^\+62[\d]{10,15}/.test(v),
    message: 'phone number isn\'t valid',
  },
  unique: true,
};

const noKK = {
  type: String,
  default: 'xxx00000xx',
};

const currentAddress = {
  address: String,
};

const religion = { type: String };

const marriageStatus = {
  type: String,
  enum: {
    values: ['sudah menikah', 'belum menikah'],
    message: '{VALUE} is not supported',
  },
  // lowercase: true,
  required: [true, 'Provide Marriage Status'],
};

const job = { type: String };
const citizenship = {
  type: String,
  enum: {
    values: ['WNI', 'WNA'],
    message: '{VALUE} is not supported',
  },
  // lowercase: true,
};

const nik = {
  type: String,
  required: [true, 'Provide NIK'],
  unique: true,
};

const password = {
  type: String,
  minLength: 59,
  maxLength: 61,
  required: [true, 'Provide Password'],
};

const roles = {
  type: String,
  enum: {
    values: ['umum', 'korlu', 'korcam', 'korpil', 'admin'],
    message: '{VALUE} is not supported',
  },
  default: 'umum',
};

const confirmed = { type: Boolean, default: false };
const addBy = { type: mongoose.Schema.Types.ObjectId, default: null };

const complaintSchema = new mongoose.Schema({
  content: { type: String, default: '' },
  responded: { type: Boolean, default: false },
  readTime: { type: Date, default: null },
  createdAt: String,
  updatedAt: String,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    currentTime: () => new Date(Date.now()).toString(),
  },
});

const userSchema = new mongoose.Schema({
  fullName,
  birth,
  gender,
  cardAddress,
  phoneNumber,
  noKK,
  currentAddress,
  religion,
  marriageStatus,
  job,
  citizenship,
  nik,
  confirmed,
  addBy,
  password,
  roles,
  complaints: [complaintSchema],
  children: [mongoose.Schema.Types.ObjectId],
  createdAt: String,
  updatedAt: String,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    currentTime: () => new Date(Date.now()).toString(),
  },
});

// const handleError = (error, res, next) => {
//   if (error.message.includes('Provide First Name')) {
//     next(new Error('Provide First Name'));
//   } else if (error.message.includes('Provide Last Name')) {
//     next(new Error('Provide Last Name'));
//   }
// };

userSchema.post('save', handleError);
// userSchema.post('save', handleRequiredField);

// options for schema
userSchema.set({
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
  autoCreate,
});

const UserModel = new mongoose.model('User', userSchema);

module.exports = UserModel;
