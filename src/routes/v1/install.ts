import { AppManagementRequest } from '@appTypes/express';
import logger from '@logger';
import { NextFunction, Request, Response } from 'express';

/**
 * Route to install app and save credentials
 * @param body | object
 */
export default async function installAppRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      appId, schoolId, clientId, clientSecret,
    } = (req as AppManagementRequest);

    logger.info('Installing app with params', {
      appId,
      schoolId,
      clientId,
      clientSecret,
    });

    // ... Any logic to install the app

    return res.json({
      success: true,
      message: 'App successfully installed',
    });
  } catch (error) {
    return next(error);
  }
}
