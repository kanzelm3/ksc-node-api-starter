import Lab from 'lab';
import Code from 'code';
import server from '../../src/server';
export const lab = Lab.script();

const { experiment, test } = lab;
const { expect } = Code;

experiment('Photo endpoint', () => {
  // tests
  test('should deny view of photo if unauthenticated /photo/{id*}', done => {
    const options = {
      method: 'GET',
      url: '/photo/8795',
    };
    // server.inject lets you similate an http request
    server.inject(options, response => {
      expect(response.statusCode).to.equal(401);  //  Expect http response status code to be 200 ('Ok')
      expect(response.result.message).to.equal('Please log-in to see that'); // (Don't hard-code error messages)
      done();
    });
  });
});
