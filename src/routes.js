// import 3rd party modules
const mongoose = require('mongoose');
const bycrpt = require('bcryptjs');
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
    method: 'POST',
    path: '/login',
    handler: async (request, h) => {
      mongoose.connect('mongodb://localhost:27017/sobatBeuTest');
      const { phoneNumber, password } = request.payload;
      const user = new User(phoneNumber, password);

      try {
        const fixUser = await user.login();
        const res = { status: 'success', message: 'user is valid', user: fixUser };

        const response = h.response(res);

        return response;
      } catch (err) {
        if (err.message === 'phone number is not registered') {
          return { status: 'failed', message: err.message };
        }
        return { status: 'failed', message: err.message };
      }
    },
  },
  {
    method: ['POST', 'GET'],
    path: '/api/user',
    handler: async (request, h) => {
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

        try {
          const user = await User.addUser(
            fullname, birth, gender, cardAddress, phoneNumber, noKK,
            currentAddress, religion, marriageStatus, job, citizenship,
            nik, password, addBy, roles, confirmed, complaints,
          );

          return { message: 'success' };
        } catch (err) {
          return { status: 'failed', message: err.message };
          // return 'error';
        }
      }

      return User.getUser('a');
    },
  },
];

module.exports = routes;
