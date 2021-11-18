// import local modules
const KabupatenModel = require('../models/kabupatenModel');

class Kabupaten {
  static async addKabupaten(
    provinceId,
    provinceName,
    kabupatenId,
    kabupatenCode,
    kabupatenName,
  ) {
    let kabupaten = new KabupatenModel({
      provinceId,
      provinceName,
      kabupatenId,
      kabupatenCode,
      kabupatenName,
    });

    kabupaten = await kabupaten.save();
    return kabupaten;

  }

  // filter by provinceId
  static async getKabupatenById(id) {
    const kabupaten = await KabupatenModel.find({ provinceId: id });

    return kabupaten;
  }

//   updateProvince() {}
//   deleteProvince() {}
}

module.exports = Kabupaten;
