/**
 * fn
 * birth
 * gender
 * cardAddress
 * phoneNumber
 * noKK
 * currentAddress
 * religion
 * marriageStatus
 * job
 * citizenship
 * nik
 * password
 * complaints
 */

// import 3rd party modules
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// import local modules
const UserModel = require('../models/userModel');


class User {
  constructor(phoneNumber, password) {
    this.phoneNumber = phoneNumber;
    this.password = password;
  }

  static async addUser(
    fn, birth, gender, cardAddress, phoneNumber,
    noKK, curAddress, religion, marriageStat, job,
    citizenship, nik, password, addBy = null, roles = 'umum',
    confirmed = false, complaints = [],
  ) {
    const salt = bycrpt.genSaltSync();
    const hashedPass = bycrpt.hashSync(password, salt);
    const newUser = new UserModel({
      fullName: fn,
      birth,
      gender,
      cardAddress,
      phoneNumber,
      noKK,
      religion,
      job,
      citizenship,
      nik,
      addBy,
      roles,
      confirmed,
      complaints,
      password: hashedPass,
      currentAddress: curAddress,
      marriageStatus: marriageStat,
    });
    const user = await newUser.save();
    return user;
  }

  // incomplete
  static getUser(fullname = null) {
    return UserModel.findOne();
  }

  async login() {
    const user = await UserModel.findOne({ phoneNumber: this.phoneNumber });
    if (!user) {
      throw new Error('phone number is not registered');
    }
    if (!bycrpt.compareSync(this.password, user.password)) {
      throw new Error('password is wrong');
    }

    console.log(process.env.SECRET_KEY);
    // 1 day expiration time for the token
    const token = jwt.sign(
      {
        user,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
        iat: Math.floor(Date.now() / 1000),
      }, process.env.SECRET_KEY,
    );

    return token;
  }
}

module.exports = User;
