// import 3rd party modules
const mongoose = require('mongoose');
// import local modules
const User = require('./instances/users');

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
 */

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      const response = h.response({ status: 'success', message: 'Hello World' });
      response.code(200);
      return response;
    },
  },
  {
    method: ['POST', 'GET'],
    path: '/api/user',
    handler: (request, h) => {
      mongoose.connect('mongodb://localhost:27017/sobatBeuTest');
      if (request.method === 'post') {
        const {
          fullname,
          birth,
          gender,
          cardAddress,
          phoneNumber,
          noKK,
          currentAddress,
          religion,
          marriageStatus,
          job,
          citizenship,
          nik,
          password,
          addBy,
          roles,
          confirmed,
          complaints,
        } = request.payload;

        const newUser = new User(
          fullname, birth, gender, cardAddress, phoneNumber, noKK,
          currentAddress, religion, marriageStatus, job, citizenship,
          nik, password, addBy, roles, confirmed, complaints,
        );

        newUser.addUser();

        return { message: 'success' };
      }

      return User.getUser('a');
    },
  },
];

module.exports = routes;
