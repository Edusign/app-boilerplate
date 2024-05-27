/* eslint-disable global-require */
jest.mock('@utils/getApiInstance', () => {
  const { default: fakeData } = require('@tests/mocks/fakeData.mock');

  return jest.fn().mockResolvedValue({
    apps: jest.fn().mockReturnValue({
      getParameters: jest.fn().mockResolvedValue({
        result: [{
          NAME: 'EXAMPLE_API_KEY',
          VALUE: fakeData.ExampleApiKey,
          TYPE: 'text',
          OPTIONS: '',
        }],
      }),
    }),
    students: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ result: fakeData.standardStudent }),
    }),
    professors: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ result: fakeData.standardTeacher }),
    }),
    externals: jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ result: fakeData.standardExternal }),
    }),
  });
});
