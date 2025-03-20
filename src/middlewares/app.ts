import { NextFunction, Request, Response } from 'express';

import { AppParameter, AppParameters } from '@appTypes/parameters';
import { getAppParameters } from '@repositories/parameters';
import logger from '@logger';

export default async function appMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Getting school and app id from the headers
    req.schoolId = req.body.schoolId || req.headers?.['x-edusign-school-id']?.toString();

    if (!req.schoolId) {
      throw new Error('School id is missing');
    }

    req.appId = req.headers?.['x-edusign-app-id']?.toString();
    req.lang = req.headers?.['x-edusign-lang']?.toString() || 'en';
    req.hmac = req.headers?.['x-edusign-hmac']?.toString();
    req.userId = req.body?.caller?.userId;
    req.location = req.body?.LOCATION;

    req.studentId = req.body?.context?.studentId;
    req.teacherId = req.body?.context?.teacherId;
    req.externalId = req.body?.context?.externalId;
    req.groupId = req.body?.context?.groupId;

    req.clientId = req.body?.client_id;
    req.clientSecret = req.body?.client_secret;
    req.apiKey = req.body?.token;

    req.appParameters = null;
    
    return next();
  } catch (error) {
    return next(error);
  }
}
