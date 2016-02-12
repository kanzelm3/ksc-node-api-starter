import Boom from 'boom';

export default (request, reply) => {
  reply(Boom.unauthorized('Please log-in to see that'));
};
