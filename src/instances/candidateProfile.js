// import 3rd party modules

// import local modules
const CandidateProfileModel = require('../models/candidateProfileModel');
const ProvinsiModel = require('../models/provinsiModel');
const KabupatenModel = require('../models/kabupatenModel');

class CandidateProfile {

  static async addCandidate(profile) {
    if (
      typeof profile.name === 'undefined'
    || typeof profile.gender === 'undefined'
    || typeof profile.nik === 'undefined'
    || typeof profile.level === 'undefined'
    || typeof profile.candidateNum === 'undefined'
    || typeof profile.provinceId === 'undefined'
    || typeof profile.kabupatenCode === 'undefined'
    ) {
      throw new Error('[name, gender, nik, level, candidateNum, provinceId, kabupatenCode] harus ada');
    }

    const provinsi = await ProvinsiModel.find({ provinceId: profile.provinceId });
    const kabupaten = await KabupatenModel.find({ kabupatenCode: profile.kabupatenCode });
    if (provinsi.length < 1 || kabupaten.length < 1) {
      throw new Error('provinsi atau kabupaten tidak terdaftar');
    }
    let candidate = new CandidateProfileModel(profile);
    candidate = await candidate.save();

    return candidate;
  }
}

module.exports = CandidateProfile;
