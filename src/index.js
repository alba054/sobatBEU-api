// import 3rd party modules
const Hapi = require('@hapi/hapi');
// import local modules
const routes = require('./routes');

require('dotenv').config();

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
