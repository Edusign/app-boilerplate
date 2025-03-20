import Edusign from '@_edusign/api';
import { Environment } from '@appTypes/environment/envs';

/**
 * Function to get the credentials
 * @param schoolId | string
 * @returns edusignAPI | Edusign.Edusign
 */
export default async function getApiInstance(apiKey: string) {
  const edusignApiMode = process.env.NODE_ENV === Environment.PRODUCTION ? 'production' : 'sandbox';

  //* Here you can fetch the credentials from the database and return the API instance for example
  if (!apiKey) {
    throw new Error('No school API token found');
  }
  return new Edusign.Edusign(apiKey, edusignApiMode);
}
