import { AppParameter, AppParameters } from '@appTypes/parameters';
import { Request } from 'express';

export interface BasicAppRequest {
  appParameters: Record<keyof AppParameters, AppParameter> | null,
  schoolId?: string,
  appId?: string,
  userId?: string,
  lang?: string,
  studentId?: string,
  teacherId?: string,
  externalId?: string,
  groupId?: string,
  clientId?: string,
  clientSecret?: string,
  token?: string,
}

export interface AppManagementRequest extends Request, BasicAppRequest {
  schoolId: string,
  clientId: string,
  clientSecret: string,
  token: string,
}

declare module 'express-serve-static-core' {
  interface Request extends BasicAppRequest { }
}
