const NewsModel = require('../models/newsModel');

/*
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
*/

class News {
  static async addNews(num = 0, types = 'link', content = '', thumbnail = Buffer.alloc(5)) {
    const newNews = new NewsModel({
      numOfReaders: num,
      types,
      content,
      thumbnail,
    });

    const news = await newNews.save();

    return news;
  }
}
