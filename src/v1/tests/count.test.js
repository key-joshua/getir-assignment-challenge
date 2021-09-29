/* eslint-disable no-underscore-dangle */
import chaihttp from 'chai-http';
import chai, { expect } from 'chai';
import { OK, NOT_FOUND } from 'http-status';

import app from '../../index';
import dummyData from './count.dummy';

chai.use(chaihttp);
const router = () => chai.request(app);

describe('TEST FETCH DATA API', async () => {
  it('User should be able to fetch data', (done) => {
    router()
      .post('/api/v1/count/fetch-data')
      .send(dummyData[0])
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should not be able to fetch data which is not exist', (done) => {
    router()
      .post('/api/v1/count/fetch-data')
      .send(dummyData[1])
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});
