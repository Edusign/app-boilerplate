import fakeData from '@tests/mocks/fakeData.mock';

const basicHeaders = {
  Accept: 'application/json',
  'x-edusign-version': '1.0',
  'x-edusign-webhook-type': 'app-form-completion',
  'x-edusign-hmac': '017305c6cbf4e6ece3641d20af1b30c7d63fd9a173c9e563e4c458297263df26',
};

export default function generateHeaders(
  schoolId: string = fakeData.schoolID,
  appId: string = fakeData.appID,
  lang = fakeData.lang,
  headers: Record<string, string> = {},
) {
  return {
    ...basicHeaders,
    'x-edusign-school-id': schoolId,
    'x-edusign-app-id': appId,
    'x-edusign-lang': lang,
    ...headers,
  };
}
