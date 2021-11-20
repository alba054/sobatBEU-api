// import 3rd party modules

// import local modules
const NewsModel = require('../models/newsModel');
const WebAdmin = require('./webAdmin');
const CandidateProfileModel = require('../models/candidateProfileModel');


class News {
  static async addNews(profile) {
    if (typeof profile.candidateNum === 'undefined') {
      throw new Error('candidateNum harus ada');
    }

    if (profile.createdBy) {
      try {
        const webAdmins = await WebAdmin.getWebAdminByCandidate(profile.candidateNum);

        const admin = webAdmins.find((v) => v._id.toString() === profile.createdBy.toString());

        if (!admin) {
          throw new Error('admin tidak terdaftar pada kandidat');
        }
      } catch (err) {
        throw new Error(err.message);
      }
    }

    let news = new NewsModel(profile);
    news = await news.save();

    return news;
  }

  static async getNews(candidateNum) {
    const candidate = await CandidateProfileModel.find({ candidateNum });

    if (candidate.length < 1) {
      throw new Error('kandidat tidak terdaftar');
    }

    const news = await NewsModel
      .find({ candidateNum })
      .populate('createdBy')
      .populate('updatedBy');

    return {
      candidate,
      news,
    };
  }

  static async getOneNews(candidateNum, _id) {
    const candidate = await CandidateProfileModel.find({ candidateNum });

    if (candidate.length < 1) {
      throw new Error('kandidat tidak terdaftar');
    }

    let news = await NewsModel
      .find({ candidateNum })
      .populate('createdBy')
      .populate('updatedBy');

    news = news.find((v) => v._id.toString() === _id);

    if (!news) {
      throw new Error('berita tidak ditemukan');
    }

    news.numOfReaders += 1;
    await news.save();

    return {
      candidate,
      news,
    };
  }

  // allowed field to be updated by client
  // * link
  // * types
  // * content
  // * thumbnail
  static async updateNews(candidateNum, _id, profile) {
    const candidate = await CandidateProfileModel.find({ candidateNum });

    if (candidate.length < 1) {
      throw new Error('kandidat tidak terdaftar');
    }

    if (profile.updatedBy) {
      try {
        const webAdmins = await WebAdmin.getWebAdminByCandidate(profile.candidateNum);

        const admin = webAdmins.find((v) => v._id.toString() === profile.updatedBy.toString());

        if (!admin) {
          throw new Error('admin tidak terdaftar pada kandidat');
        }
      } catch (err) {
        throw new Error(err.message);
      }
    }
    let news = await NewsModel
      .find({ candidateNum })
      .populate('createdBy')
      .populate('updatedBy');

    news = news.find((v) => v._id.toString() === _id);
    if (!news) {
      throw new Error('berita tidak ditemukan');
    }

    news.link = profile.link || news.link;
    news.types = profile.types || news.types;
    news.content = profile.content || news.content;
    news.thumbnail = profile.thumbail || news.thumbnail;
    news.isUpdatedByAdmin = profile.isUpdatedByAdmin;
    news.updatedBy = news.isUpdatedByAdmin ? null : profile.updatedBy;
    // news.numOfReaders += 1;
    await news.save();

    return {
      candidate,
      news,
    };
  }

  static async deleteNews(candidateNum, _id) {
    const candidate = await CandidateProfileModel.find({ candidateNum });

    if (candidate.length < 1) {
      throw new Error('kandidat tidak terdaftar');
    }

    const res = await NewsModel.deleteOne({ candidateNum, _id });

    if (res.deletedCount === 0) {
      throw new Error('berita tidak ditemukan');
    }

    return { candidate, res };
  }
}

module.exports = News;
