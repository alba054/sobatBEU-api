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
const addCandidateHandler = require('./handlers/candidateHandler');
const { addWebAdminHandler, getWebAdminByCandidate } = require('./handlers/webAdminHandler');
const {
  addCandidateNews,
  getCandidateNews,
  getOneCandidateNews,
  updateCandidateNews,
  deleteCandidateNews,
} = require('./handlers/newsHandler');

require('dotenv').config();

require('./config/database').connect(process.env.LOCAL_DATABASE_URI);

const routes = [
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
    path: '/api/kandidat',
    handler: addCandidateHandler,
  },
  {
    method: 'POST',
    path: '/api/admin',
    handler: addWebAdminHandler,
  },
  {
    method: 'GET',
    path: '/api/admin/{candidateNum}',
    handler: getWebAdminByCandidate,
  },
  {
    method: 'POST',
    path: '/api/news/{candidateNum}',
    handler: addCandidateNews,
  },
  {
    method: 'GET',
    path: '/api/news/{candidateNum}',
    handler: getCandidateNews,
  },
  {
    method: 'GET',
    path: '/api/news/{candidateNum}/{id}',
    handler: getOneCandidateNews,
  },
  {
    method: 'PUT',
    path: '/api/news/{candidateNum}/{id}',
    handler: updateCandidateNews,
  },
  {
    method: 'DELETE',
    path: '/api/news/{candidateNum}/{id}',
    handler: deleteCandidateNews,
  },
];

module.exports = routes;
