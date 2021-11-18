// import local modules
const KelurahanModel = require('../models/kelurahanModel');

class Kelurahan {
  static async addKelurahan(
    provinceId,
    provinceName,
    kabupatenId,
    kabupatenCode,
    kabupatenName,
    kecamatanId,
    kecamatanCode,
    kecamatanName,
    kelurahanId,
    kelurahanCode,
    kelurahanName,
  ) {
    let kelurahan = new KelurahanModel({
      provinceId,
      provinceName,
      kabupatenId,
      kabupatenCode,
      kabupatenName,
      kecamatanId,
      kecamatanCode,
      kecamatanName,
      kelurahanId,
      kelurahanCode,
      kelurahanName,
    });

    kelurahan = await kelurahan.save();
    return kelurahan;

  }

  // filter by kecamatanCode
  static async getKelurahanByCode(code) {
    const kelurahan = await KelurahanModel.find({ kecamatanCode: code });

    return kelurahan;
  }

//   updateProvince() {}
//   deleteProvince() {}
}

module.exports = Kelurahan;
