// import 3rd party modules
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// import local modules
const WebAdminModel = require('../models/webAdminModel');
const CandidateProfileModel = require('../models/candidateProfileModel');

class WebAdmin {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async login() {
    const webAdmin = await WebAdminModel.findOne({ username: this.username });
    if (!webAdmin) {
      throw new Error('admin tidak terdaftar');
    }
    if (!bycrpt.compareSync(this.password, webAdmin.password)) {
      throw new Error('password is wrong');
    }

    // 1 day expiration time for the token
    const token = jwt.sign(
      {
        webAdmin,
        sub: `${process.env.SUBJECT_URI}${process.env.SUB_WEB}`,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
        iat: Math.floor(Date.now() / 1000),
      }, process.env.SECRET_KEY,
    );

    return token;
  }

  static async addWebAdmin(profile) {
    if (
      typeof profile.username === 'undefined'
      || typeof profile.password === 'undefined'
      || typeof profile.candidateNum === 'undefined'
    ) {
      throw new Error('[username, password, candidateNum] tidak boleh kosong');
    }
    const salt = bycrpt.genSaltSync();
    profile.password = bycrpt.hashSync(profile.password, salt);

    const candidate = await CandidateProfileModel.find({ candidateNum: profile.candidateNum });

    if (candidate.length < 1) {
      throw new Error('kandidat tidak terdaftar');
    }

    let webAdmin = WebAdminModel(profile);
    webAdmin = await webAdmin.save();

    return webAdmin;
  }

  static async getWebAdminByCandidate(candidateNum) {
    const candidate = await CandidateProfileModel.find({ candidateNum });

    if (candidate.length < 1) {
      throw new Error('kandidat tidak terdaftar');
    }

    const webAdmins = await WebAdminModel.find({ candidateNum }).populate('candidate');

    return webAdmins;
  }
}

module.exports = WebAdmin;
