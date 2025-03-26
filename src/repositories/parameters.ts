import _ from 'lodash';

/* eslint-disable import/prefer-default-export */
import { AppParameters, AppParameter } from '@appTypes/parameters';
import { EdusignApiType } from '@appTypes/express';

/**
 * Fetches application parameters from the Edusign API for a specific application and school.
 *
 * @param apiInstance - An instance of the Edusign API client.
 * @param appId - The ID of the application for which parameters are being fetched.
 * @param schoolId - The ID of the school associated with the application.
 * @returns A promise that resolves to an object where the keys are parameter names and the values are the corresponding app parameters.
 * @throws An error if the API call fails, including the error message from the API response if available.
 */
export const getAppParameters = async (apiInstance: EdusignApiType, appId: string, schoolId: string): Promise<Record<keyof AppParameters, AppParameter>> => {
  // Fetching appParameters from the API
  return apiInstance.apps().getParameters()
    // Converting the array of parameters to an object with the parameter name as the key
    .then(({ result }: { result: Record<string, any> }) => Object.values(result).reduce((parameters, parameter: any) => ({
      ...parameters,
      [parameter.NAME]: _.omit(parameter, ['NAME']),
    }), {} as Record<keyof AppParameters, AppParameter>))
    .catch((error: Error & { message: { data: { message: string } } }) => {
      throw new Error(`Error while getting the app parameters on Edusign API: ${error.message?.data?.message || error.message}`);
    });
};
