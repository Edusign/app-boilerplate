import Edusign from '@_edusign/api';
import { Environment } from '@appTypes/environment/envs';


/**
 * Retrieves an instance of the Edusign API configured with the provided API key.
 *
 * The API mode is determined based on the current environment:
 * - `production` mode is used if the environment is set to `Environment.PRODUCTION`.
 * - `sandbox` mode is used otherwise.
 *
 * @param apiKey - The API key used to authenticate with the Edusign API.
 * @returns A promise that resolves to an instance of the Edusign API.
 * @throws {Error} If the provided API key is not valid or missing.
 */
export default async function getApiInstance(apiKey: string) {
  const edusignApiMode = process.env.NODE_ENV === Environment.PRODUCTION ? 'production' : 'sandbox';

  //* Here you can fetch the credentials from the database and return the API instance for example
  if (!apiKey) {
    throw new Error('No school API token found');
  }
  return new Edusign.Edusign(apiKey, edusignApiMode);
}
