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
    citizenship, nik, password, addBy = null, roles = 'umum',
    confirmed = false, complaints = [],
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
    this.addBy = addBy;
    this.roles = roles;
    this.confirmed = confirmed;
    this.complaints = complaints;

    const salt = bycrpt.genSaltSync();
    this.password = bycrpt.hashSync(password, salt);
  }

  addUser() {
    const newUser = new UserModel({
      fullName: this.fn,
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
      addBy: this.addBy,
      roles: this.roles,
      confirmed: this.confirmed,
      complaints: this.complaints,
    });
    // console.log(newUser);

    newUser.save()
      .then((savedDoc) => savedDoc === newUser)
      .catch((err) => console.log(err));
    // try {
    //   await newUser.save();
    // } catch (err) {
    //   console.log(err);
    // }
  }

  static getUser(fullname) {
    return UserModel.findOne();
  }
}

module.exports = User;
