const Hapi = require('@hapi/hapi');

const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.NODE_PORT || 5000,
    host: process.env.NODE_HOST || 'localhost',
    // routes: {}
  });

  server.route(routes);

  await server.start();
  console.log(`Server is running on ${server.info.uri}`);
};

init();
