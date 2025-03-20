/* eslint-disable import/prefer-default-export */

import { AppCredential, AppCredentialColumns, TableNames } from "@appTypes/databases";
import db from "@db";

export const getSchoolCredentials = async (
  schoolId: string,
) => (
  db<AppCredential>(TableNames.APP_CREDENTIALS).where({
    [AppCredentialColumns.SCHOOL_ID]: schoolId,
  })
  .first()
)


export const insertOrUpdateSchool = async (
  schoolId: string,
  apiKey: string,
  clientId: string,
  clientSecret: string,
) => (
  db(TableNames.APP_CREDENTIALS).insert({
    [AppCredentialColumns.SCHOOL_ID]: schoolId,
    [AppCredentialColumns.API_KEY]: apiKey,
    [AppCredentialColumns.CLIENT_ID]: clientId,
    [AppCredentialColumns.CLIENT_SECRET]: clientSecret,
  }).onConflict(AppCredentialColumns.SCHOOL_ID).merge({
    [AppCredentialColumns.API_KEY]: apiKey,
    [AppCredentialColumns.CLIENT_ID]: clientId,
    [AppCredentialColumns.CLIENT_SECRET]: clientSecret,
  })
)

export const removeSchool = async (
  schoolId: string,
) => (
  db(TableNames.APP_CREDENTIALS).where({
    [AppCredentialColumns.SCHOOL_ID]: schoolId,
  }).delete()
)