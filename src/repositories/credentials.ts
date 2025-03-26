import { AppCredential, AppCredentialColumns, TableNames } from "@appTypes/databases";
import db from "@db";

/**
 * Retrieves the credentials for a specific school from the database.
 *
 * @param schoolId - The unique identifier of the school whose credentials are to be fetched.
 * @returns A promise that resolves to the first matching `AppCredential` record for the given school ID, or `undefined` if no match is found.
 */
export const getSchoolCredentials = async (
  schoolId: string,
) => (
  db<AppCredential>(TableNames.APP_CREDENTIALS).where({
    [AppCredentialColumns.SCHOOL_ID]: schoolId,
  })
  .first()
)

/**
 * Retrieves the client secret for a specific school from the database.
 *
 * @param schoolId - The unique identifier of the school.
 * @returns A promise that resolves to the client secret as a string, or `null` if not found.
 */
export const getSchoolClientSecret = async (
  schoolId: string,
) => (
  db<AppCredential>(TableNames.APP_CREDENTIALS)
  .select(AppCredentialColumns.CLIENT_SECRET)
  .where({
    [AppCredentialColumns.SCHOOL_ID]: schoolId,
  })
  .first()
  .then((result) => result?.[AppCredentialColumns.CLIENT_SECRET] ?? null)
)

/**
 * Inserts or updates a school's credentials in the database.
 *
 * If a record with the specified `schoolId` already exists, it updates the
 * `apiKey`, `clientId`, and `clientSecret` fields. Otherwise, it inserts a new
 * record with the provided values.
 *
 * @param schoolId - The unique identifier for the school.
 * @param apiKey - The API key associated with the school.
 * @param clientId - The client ID for the school's credentials.
 * @param clientSecret - The client secret for the school's credentials.
 * @returns A promise that resolves when the operation is complete.
 */
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

/**
 * Removes a school record from the APP_CREDENTIALS table based on the provided school ID.
 *
 * @param schoolId - The unique identifier of the school to be removed.
 * @returns A promise that resolves to the number of rows deleted.
 */
export const removeSchool = async (
  schoolId: string,
) => (
  db(TableNames.APP_CREDENTIALS).where({
    [AppCredentialColumns.SCHOOL_ID]: schoolId,
  }).delete()
)