import _ from 'lodash';

/* eslint-disable import/prefer-default-export */
import { AppParameters, AppParameter } from '@appTypes/parameters';
import getApiInstance from '@utils/getApiInstance';

export const getAppParameters = async (appId: string, schoolId: string): Promise<Record<keyof AppParameters, AppParameter>> => {
  const apiInstance = await getApiInstance(schoolId);
  // Fetching appParameters from the API
  return apiInstance.apps().getParameters(appId)
    // Converting the array of parameters to an object with the parameter name as the key
    .then(({ result }: { result: Record<string, any>[] }) => result.reduce((parameters, parameter) => ({
      ...parameters,
      [parameter.NAME]: _.omit(parameter, ['NAME']),
    }), {} as Record<keyof AppParameters, AppParameter>))
    .catch((error: Error & { message: { data: { message: string } } }) => {
      throw new Error(`Error while getting the app parameters on Edusign API: ${error.message?.data?.message || error.message}`);
    });
};
