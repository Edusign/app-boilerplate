import Edusign from '@_edusign/api';
import * as credentialsRepository from '@repositories/credentials';

/**
 * Function to get the credentials
 * @param schoolId | string
 * @returns edusignAPI | Edusign.Edusign
 */
export default async function getApiInstance(schoolId: string) {
  const edusignApiMode: 'production' | 'sandbox' = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

  //* Here you can fetch the credentials from the database and return the API instance for example
  const apiKey = await credentialsRepository.getSchoolTokenById(schoolId);
  if (!apiKey) {
    throw new Error('No credentials found');
  }
  const edusignAPI = new Edusign.Edusign(apiKey, edusignApiMode);
  return edusignAPI;
}
