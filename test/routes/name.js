import Lab from 'lab';
import Code from 'code';
import server from '../../src/server';
export const lab = Lab.script();

const { experiment, test } = lab;
const { expect } = Code;

experiment('Name endpoint', () => {
  // tests
  test('should return the correct response', done => {
    const options = {
      method: 'GET',
      url: '/Timmy',
    };
    // server.inject lets you similate an http request
    server.inject(options, response => {
      expect(response.statusCode).to.equal(200); // Expect http response status code to be 200 ('Ok')
      expect(response.result).to.have.length(10); // Expect result to be 'Hai Timmy!' (10 chars long)
      expect(response.result).to.equal('Hai Timmy!');
      done(); // done() callback is required to end the test.
    });
  });

  // we expect this test to return 400 (validation error)
  test('returns validation error if name is less than 2 characters', done => {
    const options = {
      method: 'GET',
      url: '/T',
    };

    server.inject(options, response => {
      expect(response.statusCode).to.equal(400);
      expect(response.result.message).to.equal('child "name" fails because ["name" length must be at least 2 characters long]');
      done();
    });
  });
});
