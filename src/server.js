import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import routes from './routes';
import { version } from '../package';
const port = process.env.PORT || 3000;

const server = new Hapi.Server();
server.connection({ port });

const swagOptions = {
  info: {
    title: 'API Documentation',
    description: 'Starter Node.js API for Kanzelmeyer Software Company',
    version,
    contact: {
      name: 'Kanzelmeyer Software Company',
      url: 'http://kanzelmeyer.co',
      email: 'kanzelm3@gmail.com',
    },
  },
};

server.register([
  Inert,
  Vision,
  {
    register: HapiSwagger,
    options: swagOptions,
  },
], () => {
  server.start(err => {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
});

routes(server);

export default server;
