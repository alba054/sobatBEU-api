// import local modules
const KecamatanModel = require('../models/kecamatanModel');

class Kecamatan {
  static async addKecamatan(
    provinceId,
    provinceName,
    kabupatenId,
    kabupatenCode,
    kabupatenName,
    kecamatanId,
    kecamatanCode,
    kecamatanName,
  ) {
    let kecamatan = new KecamatanModel({
      provinceId,
      provinceName,
      kabupatenId,
      kabupatenCode,
      kabupatenName,
      kecamatanId,
      kecamatanCode,
      kecamatanName,
    });

    kecamatan = await kecamatan.save();
    return kecamatan;

  }

  // filter by kabupatenCode
  static async getKecamatanByCode(code) {
    const kecamatan = await KecamatanModel.find({ kabupatenCode: code });

    return kecamatan;
  }

//   updateProvince() {}
//   deleteProvince() {}
}

module.exports = Kecamatan;
