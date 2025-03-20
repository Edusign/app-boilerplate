import { AppManagementBody } from '@appTypes/express';
import logger from '@logger';
import * as credentialsRepository from '@repositories/credentials';
import { NextFunction, Request, Response } from 'express';

/**
 * Route to install app and save credentials
 * @param body | object
 */
export default async function installAppRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const { 
      token: apiKey, 
      schoolId,
      client_secret: clientSecret, 
      client_id: clientId
     } = req.body as AppManagementBody;
    if (!schoolId || !clientId) {
      throw new Error('schoolId and clientId are required');
    }

    if (!apiKey || !clientSecret) {
      throw new Error('apiKey and clientSecret are required');
    }

    logger.info('Installing app with params', {
      apiKey,
      schoolId,
      clientId,
      clientSecret,
    });

    await credentialsRepository.insertOrUpdateSchool(
      schoolId,
      apiKey,
      clientId,
      clientSecret,
    );

    res.json({
      success: true,
      message: 'App successfully installed',
    });
  } catch (error) {
    return next(error);
  }
}
