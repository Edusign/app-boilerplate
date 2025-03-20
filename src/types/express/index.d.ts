import { AppParameter, AppParameters } from '@appTypes/parameters';
import { Request } from 'express';
import getApiInstance from '@utils/getApiInstance';

export type EdusignApiType = Awaited<ReturnType<typeof getApiInstance>>;

type BasicApp = {
  appParameters: Record<keyof AppParameters, AppParameter> | null,
  schoolId?: string,
  appId?: string,
  hmac?: string,
  userId?: string,
  lang?: string,
  studentId?: string,
  teacherId?: string,
  externalId?: string,
  groupId?: string,
  clientId?: string,
  clientSecret?: string,
  apiKey?: string,
  EdusignApi?: EdusignApiType,
  location?: string,
}

export type AppManagementBody = {
  client_id: string,
  client_secret: string,
  token: string,
  schoolId: string,
  parameterssValues: Record<keyof AppParameters, string>[],
}

export type BasicAppRequest = Request & BasicApp;

declare module 'express-serve-static-core' {
  interface Request extends BasicApp { }
}
