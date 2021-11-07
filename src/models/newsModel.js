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

const newsSchema = new mongoose.Schema({
  numOfReaders: { type: Number, default: 0 },
  types: {
    type: String,
    default: 'link',
    enum: {
      values: ['ori', 'link'],
      message: '{VALUE} is not supported',
    },
  },
  content: { type: String, default: '' },
  thumbnail: { type: mongoose.SchemaTypes.Buffer },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    currentTime: () => new Date(Date.now()).toString(),
  },
});

newsSchema.post('save', handleError);

newsSchema.set({
  bufferCommands,
  bufferTimeoutMS,
  optimisticConcurrency,
  autoCreate,
});

const NewsModel = mongoose.model('news', newsSchema);

module.exports = NewsModel;
