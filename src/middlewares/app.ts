import { NextFunction, Request, Response } from 'express';

import { AppParameter, AppParameters } from '@appTypes/parameters';
import { getAppParameters } from '@repositories/parameters';

export default async function appMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
  // Getting school and app id from the headers
    req.schoolId = req.body.schoolId || req.headers?.['x-edusign-school-id']?.toString();
    req.appId = req.headers?.['x-edusign-app-id']?.toString();
    req.lang = req.headers?.['x-edusign-lang']?.toString() || 'en';
    req.userId = req.body?.caller?.userId;

    req.studentId = req.body?.context?.studentId;
    req.teacherId = req.body?.context?.teacherId;
    req.externalId = req.body?.context?.externalId;
    req.groupId = req.body?.context?.groupId;

    req.clientId = req.body?.client_id;
    req.clientSecret = req.body?.client_secret;
    req.token = req.body?.token;

    let appParameters: Record<Partial<keyof AppParameters>, AppParameter> | null = null;
    if (req.headers?.['x-edusign-school-id'] && req.headers?.['x-edusign-app-id'] && !['/install'].includes(req.path)) {
    // Fetching appParameters from the API
      appParameters = await getAppParameters(req.headers?.['x-edusign-app-id'].toString(), req.headers?.['x-edusign-school-id'].toString());
    }
    req.appParameters = appParameters;
    return next();
  } catch (error) {
    return next(error);
  }
}
