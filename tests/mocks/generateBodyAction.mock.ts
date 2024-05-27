/* eslint-disable import/no-extraneous-dependencies */
import { fakerFR as faker } from '@faker-js/faker';

import fakeData from './fakeData.mock';

export default function generateBodyAction(
  location: string,
  context: {} = {},
  options: {
    userId: string;
    userType: string;
  } = {
    userId: fakeData.userId,
    userType: fakeData.userType,
  },
  schoolId: string = fakeData.schoolID,
  appId: string = fakeData.appID,
) {
  const processedContext: Record<string, any> = context || {};
  if (location === 'view_student_profile') {
    processedContext.studentId = fakeData.standardStudent.ID;
  } else if (location === 'view_teacher_profile') {
    processedContext.teacherId = fakeData.standardTeacher.ID;
  } else if (location === 'view_external_profile') {
    processedContext.externalId = fakeData.standardExternal.ID;
  }

  return {
    ACTION: 'apicall',
    LOCATION: location,
    caller: {
      userId: options.userId,
      userType: options.userType,
      schoolId,
      appId,
    },
    context: {
      schoolId,
      ...processedContext,
    },
    environment: [
      {
        ID: faker.number.int({
          min: 1,
          max: 100,
        }),
        APP_ID: appId,
        SCHOOL_ID: schoolId,
      },
    ],
  };
}
