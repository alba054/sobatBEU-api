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
      if (request.method === 'post') {
        console.log('hai');
        const {
          fn,
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
        } = request.payload;

        const newUser = new User(
          fn, birth, gender, cardAddress, phoneNumber, noKK,
          currentAddress, religion, marriageStatus, job, citizenship,
          nik, password,
        );

        return JSON.parse(newUser.addUser());
      }

      return 'Hello, this is api/user';
    },
  },
];

module.exports = routes;
