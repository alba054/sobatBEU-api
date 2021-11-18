// import 3rd party modules
const jwt = require('jsonwebtoken');
// import local modules
const User = require('./instances/users');
const News = require('./instances/news');
// handlers
const loginHandler = require('./handlers/login');
const { addProvinceHandler, getAllProvincesHandler } = require('./handlers/provinsiHandler');
const { addKabupatenHandler, getKabupatenByIdHandler } = require('./handlers/kabupatenHandler');
const { addKecamatanHandler, getKecamatanByCodeHandler } = require('./handlers/kecamatanHandler');
const { addKelurahanHandler, getKelurahanByCodeHandler } = require('./handlers/kelurahanHandler');

require('dotenv').config();

require('./config/database').connect(process.env.LOCAL_DATABASE_URI);
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
      const { token } = request.headers;
      if (typeof token === 'undefined') {
        const response = h.response({ status: 'failed', message: 'Missing token in headers' });
        response.code(401);
        return response;
      }

      let response = null;
      let decoded = null;
      try {
        decoded = jwt.verify(
          token,
          process.env.SECRET_KEY,
        );
      } catch (err) {
        response = null;
        switch (err.message) {
          case 'invalid token':
            response = h.response({ status: 'failed', message: 'invalid token' });
            response.code(401);
            return response;
          case 'jwt malformed':
            response = h.response({ status: 'failed', message: 'jwt is not formed correctly' });
            response.code(401);
            return response;
          default:
            response = h.response({ status: 'failed', message: 'error' });
            response.code(401);
            return response;
        }
      }
      response = h.response({ status: 'success', message: decoded.user });
      response.code(200);
      return response;
    },
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
  },
  {
    method: 'POST',
    path: '/api/wilayah',
    handler: addProvinceHandler,
  },
  {
    method: 'GET',
    path: '/api/wilayah',
    handler: getAllProvincesHandler,
  },
  {
    method: 'POST',
    path: '/api/wilayah/{provinceId}',
    handler: addKabupatenHandler,
  },
  {
    method: 'GET',
    path: '/api/wilayah/{provinceId}',
    handler: getKabupatenByIdHandler,
  },
  {
    method: 'POST',
    path: '/api/wilayah/{provinceId}-{kabupatenId}',
    handler: addKecamatanHandler,
  },
  {
    method: 'GET',
    path: '/api/wilayah/{provinceId}-{kabupatenId}',
    handler: getKecamatanByCodeHandler,
  },
  {
    method: 'POST',
    path: '/api/wilayah/{provinceId}-{kabupatenId}-{kecamatanId}',
    handler: addKelurahanHandler,
  },
  {
    method: 'GET',
    path: '/api/wilayah/{provinceId}-{kabupatenId}-{kecamatanId}',
    handler: getKelurahanByCodeHandler,
  },
  {
    method: 'POST',
    path: '/api/user',
    handler: async (request, h) => {
      // mongoose.connect('mongodb://localhost:27017/sobatBeuTest');
      try {
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

        const user = await User.addUser(
          fullname, birth, gender, cardAddress, phoneNumber, noKK,
          currentAddress, religion, marriageStatus, job, citizenship,
          nik, password, addBy, roles, confirmed, complaints,
        );
        return { status: 'success', message: 'adding new user successfully', res: user };
      } catch (err) {
        if (err instanceof TypeError) {
          return { status: 'failed', message: 'doesn\'t meet payload requirements' };
        }
        return { status: 'failed', message: err.message };
        // return 'error';
      }
    },
  },
  // {
  //   method: ['POST', 'GET', 'PUT'],
  //   path: '/api/news/{id?}',
  //   handler: async (request, h) => {
  //     switch (request.method) {
  //       case 'get':
  //         if (request.params.id) {
  //           try {
  //             const news = News.
  //           }
  //         }
  //       case 'post':
  //         try {
  //           const {
  //             numOfReaders,
  //             types,
  //             content,
  //             thumbnail = Buffer.alloc(5),
  //           } = request.payload;
  //           const news = await News.addNews(numOfReaders, types, content, thumbnail);

  //           return { status: 'success', message: 'adding news successfully', res: news };
  //         } catch (err) {
  //           // if (err instanceof TypeError) {
  //           //   return { status: 'failed', message: 'doesn\'t meet payload requirements' };
  //           // }
  //           return { status: 'failed', message: err.message };
  //         }

  //       default:
  //         return { status: 'bad request', message: 'not a legal path' };
  //     }
  //   },
  // },
];

module.exports = routes;
