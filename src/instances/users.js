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
    this.password = password;
  }
}
