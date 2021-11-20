// import 3rd party modules
const jwt = require('jsonwebtoken');
// import local modules
const News = require('../instances/news');

const addCandidateNews = async (request, h) => {
  const { token } = request.headers;
  const { candidateNum } = request.params;
  const profile = request.payload;
  let response = null;
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];

    if (sub === 'sysadmin' || sub === 'webadmin') {
      if (sub === 'webadmin') {
        profile.isCreatedByAdmin = false;
        profile.isUpdatedByAdmin = false;
        profile.createdBy = decoded.webAdmin._id;
        profile.updatedBy = decoded.webAdmin._id;
      }
      profile.candidateNum = candidateNum;

      const news = await News.addNews(profile);

      response = h.response({ status: 'success', message: 'menambah berita baru', res: news });
      response.code(201);

      return response;
    }

    response = h.response({ status: 'failed', message: 'anda bukan admin' });
    response.code(401);

    return response;

  } catch (err) {
    response = h.response({ status: 'failed', message: err.message });
    response.code(400);

    return response;
  }
};

const getCandidateNews = async (request, h) => {
  const { token } = request.headers;
  const { candidateNum } = request.params;

  let response = null;
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    // const sub = decoded.split('::')[2];

    const res = await News.getNews(candidateNum);
    response = h.response({ status: 'success', message: 'berhasil mendapatkan daftar berita', res });
    response.code(200);

    return response;

  } catch (err) {
    response = h.response({ status: 'failed', message: err.message });
    response.code(400);

    return response;
  }
};

const getOneCandidateNews = async (request, h) => {
  const { token } = request.headers;
  const { candidateNum, id } = request.params;

  let response = null;
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    // const sub = decoded.split('::')[2];

    const res = await News.getOneNews(candidateNum, id);
    response = h.response({ status: 'success', message: 'berhasil mendapatkan berita', res });
    response.code(200);

    return response;

  } catch (err) {
    response = h.response({ status: 'failed', message: err.message });
    response.code(400);

    return response;
  }
};

const updateCandidateNews = async (request, h) => {
  const { token } = request.headers;
  const { candidateNum, id } = request.params;
  const profile = request.payload;

  let response = null;
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];

    if (sub === 'sysadmin' || sub === 'webadmin') {
      if (sub === 'webadmin') {
        profile.updatedBy = decoded.webAdmin._id;
        profile.isUpdatedByAdmin = false;
      } else if (sub === 'sysadmin') {
        profile.updatedBy = null;
        profile.isUpdatedByAdmin = true;
      }

      const res = await News.updateNews(candidateNum, id, profile);
      response = h.response({ status: 'success', message: 'mengupdate berita', res });
      response.code(200);

      return response;
    }

    response = h.response({ status: 'failed', message: 'anda bukan admin' });
    response.code(401);

    return response;

  } catch (err) {
    response = h.response({ status: 'failed', message: err.message });
    response.code(400);

    return response;
  }
};

const deleteCandidateNews = async (request, h) => {
  const { token } = request.headers;
  const { candidateNum, id } = request.params;

  let response = null;
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];

    if (sub === 'sysadmin' || sub === 'webadmin') {

      const res = await News.deleteNews(candidateNum, id);
      response = h.response({ status: 'success', message: 'menghapus berita', res });
      response.code(200);

      return response;
    }

    response = h.response({ status: 'failed', message: 'anda bukan admin' });
    response.code(401);

    return response;

  } catch (err) {
    response = h.response({ status: 'failed', message: err.message });
    response.code(400);

    return response;
  }
};

module.exports = {
  addCandidateNews,
  getCandidateNews,
  getOneCandidateNews,
  updateCandidateNews,
  deleteCandidateNews,
};
