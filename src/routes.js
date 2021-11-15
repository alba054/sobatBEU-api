// import 3rd party modules
const jwt = require('jsonwebtoken');
// import local modules
const User = require('./instances/users');
const News = require('./instances/news');
const loginHandler = require('./handlers/login');
const adminLoginHandler = require('./handlers/sysadminLogin');

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
    path: '/login_admin',
    handler: adminLoginHandler,
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
  },
  {
    method: ['POST', 'GET'],
    path: '/api/user',
    handler: async (request, h) => {
      // mongoose.connect('mongodb://localhost:27017/sobatBeuTest');
      if (request.method === 'post') {
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
      }

      return User.getUser('a');
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
