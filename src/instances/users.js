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
// import local modules
const UserModel = require('../models/userModel');

class User {
  constructor(
    fn, birth, gender, cardAddress, phoneNumber,
    noKK, curAddress, religion, marriageStat, job,
    citizenship, nik, password,
  ) {
    this.fn = fn;
    this.birth = birth;
    this.gender = gender;
    this.cardAddress = cardAddress;
    this.phoneNumber = phoneNumber;
    this.noKK = noKK;
    this.curAddress = curAddress;
    this.religion = religion;
    this.marriageStat = marriageStat;
    this.job = job;
    this.citizenship = citizenship;
    this.nik = nik;

    const salt = bycrpt.genSaltSync();
    this.password = bycrpt.hashSync(password, salt);
  }

  addUser() {
    const newUser = new UserModel({
      fullname: this.fn,
      birth: this.birth,
      gender: this.gender,
      cardAddress: this.cardAddress,
      phoneNumber: this.phoneNumber,
      noKK: this.noKK,
      currentAddress: this.curAddress,
      religion: this.religion,
      marriageStatus: this.marriageStat,
      job: this.job,
      citizenship: this.citizenship,
      nik: this.nik,
      password: this.password,
    });

    return newUser;
    // try {
    //   await newUser.save();
    // } catch (err) {
    //   console.log(err);
    // }
  }
}

module.exports = User;
