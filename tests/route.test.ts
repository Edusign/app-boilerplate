import supertest from 'supertest';
import app from '@app';

import fakeData from '@tests/mocks/fakeData.mock';
import generateHeaders from './mocks/generateHeaders.mock';

describe('Test suites', () => {
  it('Should install app with success and default parameters', async () => {
    const installResponse = await supertest(app)
      .post('/v1/install')
      .set(generateHeaders())
      .send({
        schoolId: fakeData.schoolID,
        client_id: fakeData.clientId,
        client_secret: fakeData.clientSecret,
        token: fakeData.edusignApiKey,
      });

    expect(installResponse.status).toBe(200);
    expect(installResponse.body).toStrictEqual({
      success: true,
      message: 'App successfully installed',
    });
  });
});
