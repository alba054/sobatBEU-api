// import local modules
const ProvinsiModel = require('../models/provinsiModel');

class Provinsi {
  static async addProvince(id, name) {
    let provinsi = new ProvinsiModel({ provinceId: id, provinceName: name });
    provinsi = await provinsi.save();
    return provinsi;
  }

  static async getAllProvinces() {
    const provinsi = await ProvinsiModel.find();

    return provinsi;
  }

  // updateProvince() {}
  // deleteProvince() {}
}


module.exports = Provinsi;
