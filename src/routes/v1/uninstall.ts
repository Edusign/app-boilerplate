import { AppManagementRequest } from '@appTypes/express';
import logger from '@logger';
import { NextFunction, Request, Response } from 'express';

/**
 * Route to uninstall app
 * @param body | object
 */
export default async function uninstallAppRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      appId, schoolId, clientId, clientSecret,
    } = (req as AppManagementRequest);

    logger.info('Uninstalling app with params', {
      appId,
      schoolId,
      clientId,
      clientSecret,
    });

    // ... Any logic to uninstall the app

    return res.json({
      success: true,
      message: 'App successfully uninstalled',
    });
  } catch (error) {
    return next(error);
  }
}
