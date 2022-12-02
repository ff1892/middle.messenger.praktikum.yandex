import { httpTransport } from './http-transport';

const baseApi = 'https://jsonplaceholder.typicode.com';

describe('HTTPTransport', () => {

  it('Get should return a required value', (done) => {
    httpTransport.get(
      `${baseApi}/posts/1`,
    )
      .then(({ response }) => {
        const data = JSON.parse(response);
        if (data.id === 1) {
          done();
        } else {
          done(new Error('No requiered data'));
        }
      })
      .catch(done);
  });

  it('Post should return a required value', (done) => {
    httpTransport.post(
      `${baseApi}/posts`,
      {
        data: {
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
        json: true,
      },
    )
      .then(({ response }) => {
        const data = JSON.parse(response);
        if (data.id === 101) {
          done();
        } else {
          done(new Error('No requiered data'));
        }
      })
      .catch(done);
  });
});
