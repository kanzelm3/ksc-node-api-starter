import Joi from 'joi';
import handler from './handler';

export default (server) => {
  server.route({
    method: ['GET', 'POST'],
    path: '/{name}',
    config: {
      description: 'Say hai!',
      notes: 'Returns "Hai {name}!" where {name} is the name passed in the path',
      tags: ['api'],
      validate: {
        params: {
          name: Joi
            .string()
            .max(40)
            .min(2)
            .alphanum()
            .example('Kevin')
            .description('the person to say hai to'),
        },
      },
      handler,
    },
  });
};
