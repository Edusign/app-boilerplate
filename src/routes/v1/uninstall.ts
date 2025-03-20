import { NextFunction, Request, Response } from 'express';

import logger from '@logger';
import * as credentialsRepository from '@repositories/credentials';

/**
 * Route to uninstall app
 * @param body | object
 */
export default async function uninstallAppRoute(req: Request, res: Response, next: NextFunction) {
  try {
    const { schoolId } = req;

    logger.info('Uninstalling app from school ' + schoolId);

    const nbSchoolRemoved = await credentialsRepository.removeSchool(schoolId!);

    if (nbSchoolRemoved === 0) {
      throw new Error('No school found');
    }

    res.json({
      success: true,
      message: 'App successfully uninstalled',
    });
  } catch (error) {
    return next(error);
  }
}
