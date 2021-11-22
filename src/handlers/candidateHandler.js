// import 3rd party modules
const jwt = require('jsonwebtoken');
const nanoid = require('nanoid');
// import local modules
const CandidateProfile = require('../instances/candidateProfile');

const addCandidateHandler = async (request, h) => {
  const { token } = request.headers;
  const profile = request.payload;

  let response = null;
  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    const sub = decoded.sub.split('::')[2];

    if (sub === process.env.SUB_ADMIN) {
      profile.candidateNum = nanoid.nanoid(15);
      const candidate = await CandidateProfile.addCandidate(profile);
      response = h.response({ status: 'success', message: 'menambah kandidat baru', res: candidate });
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

module.exports = addCandidateHandler;
