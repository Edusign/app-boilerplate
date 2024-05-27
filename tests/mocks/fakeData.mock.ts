/* eslint-disable import/no-extraneous-dependencies */
import { fakerFR as faker } from '@faker-js/faker';

const standardStudent = {
  ID: faker.string.alphanumeric(15),
  FIRSTNAME: faker.person.firstName(),
  LASTNAME: faker.person.lastName(),
};

const standardTeacher = {
  ID: faker.string.alphanumeric(15),
  FIRSTNAME: faker.person.firstName(),
  LASTNAME: faker.person.lastName(),
};

const standardExternal = {
  ID: faker.string.alphanumeric(15),
  FIRSTNAME: faker.person.firstName(),
  LASTNAME: faker.person.lastName(),
};

const data = {
  clientId: faker.string.alphanumeric(32),
  clientSecret: faker.string.uuid(),
  lang: 'fr',
  appID: faker.string.alphanumeric(15),
  schoolID: faker.string.alphanumeric(15),
  ExampleApiKey: faker.string.uuid(),
  edusignApiKey: faker.string.uuid(),
  userId: faker.string.alphanumeric(15),
  userType: 'school',
  standardStudent: {
    ...standardStudent,
    EMAIL: faker.internet.email({
      firstName: standardStudent.FIRSTNAME,
      lastName: standardStudent.LASTNAME,
    }),
  },
  standardTeacher: {
    ...standardTeacher,
    EMAIL: faker.internet.email({
      firstName: standardTeacher.FIRSTNAME,
      lastName: standardTeacher.LASTNAME,
    }),
  },
  standardExternal: {
    ...standardExternal,
    EMAIL: faker.internet.email({
      firstName: standardExternal.FIRSTNAME,
      lastName: standardExternal.LASTNAME,
    }),
  },
};

export default data;
