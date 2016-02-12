export default (request, reply) => {
  reply(`Hai ${request.params.name}!`);
};
