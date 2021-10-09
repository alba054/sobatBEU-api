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
      const response = h.response();
    },
  },
];

module.exports = routes;
