import Joi from 'joi';
import Boom from 'boom';

export default (server) => {
  server.route({
    method: 'GET',
    path: '/photo/{id*}',
    config: {
      description: 'Get photo by id',
      notes: 'Returns photo for the ID passed in the path',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string()
            .max(40)
            .min(2)
            .alphanum()
            .example('abc123')
            .description('the ID of the photo'),
        },
      },
      handler: (request, reply) => {
        // until we implement authentication we are simply returning a 401:
        reply(Boom.unauthorized('Please log-in to see that'));
      },
    },
  });
};
