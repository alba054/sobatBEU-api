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

const numOfReaders = { type: Number, default: 0 };

// will differ each candidates' news
const candidateNum = { type: String, required: [true, 'candidateNum tidak boleh kosong'] };

const isCreatedByAdmin = {
  type: Boolean,
  default: true,
};
const isUpdatedByAdmin = {
  type: Boolean,
  default: true,
};

const createdBy = { type: mongoose.Schema.Types.ObjectId, ref: 'web_admin', default: null };

const updatedBy = { type: mongoose.Schema.Types.ObjectId, ref: 'web_admin', default: null };

const types = {
  type: String,
  default: 'link',
  enum: {
    values: ['ori', 'link'], // ori means content is not empty (written by admin)
    message: '{VALUE} is not supported',
  },
};

const link = { type: String, default: '-' };
const content = { type: String, default: '' };

const thumbnail = { type: Buffer, default: Buffer.alloc(0) };

const newsSchema = new mongoose.Schema({
  numOfReaders,
  candidateNum,
  isCreatedByAdmin,
  isUpdatedByAdmin,
  link,
  createdBy,
  updatedBy,
  types,
  content,
  thumbnail,
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    currentTime: () => new Date(Date.now()).toString(),
  },
  toJSON: { virtuals: true },
});

newsSchema.post('save', handleError);

// virtual populate
newsSchema.virtual('candidate', {
  ref: 'candidate_profile',
  localField: 'candidateNum',
  foreignField: 'candidateNum',
});

newsSchema.set({
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
  autoCreate,
});

const NewsModel = mongoose.model('news', newsSchema);

module.exports = NewsModel;
