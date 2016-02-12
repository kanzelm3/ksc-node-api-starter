import Lab from 'lab';
import Code from 'code';
import server from '../src/server';
export const lab = Lab.script();

const { experiment, test } = lab;
const { expect } = Code;

experiment('Basic HTTP Tests', () => {
  // tests
  test('Main endpoint /{yourname*} ', done => {
    const options = {
      method: 'GET',
      url: '/Timmy',
    };
    // server.inject lets you similate an http request
    server.inject(options, response => {
      expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200 ('Ok')
      expect(response.result).to.have.length(10); // Expect result to be 'Hello Timmy!' (12 chars long)
      done();                                         // done() callback is required to end the test.
    });
  });

    // we expect this test to return 400 (validation error)
  test('creating valid user', done => {
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

experiment('Authentication Required to View Photo', () => {
  // tests
  test('Deny view of photo if unauthenticated /photo/{id*} ', done => {
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
