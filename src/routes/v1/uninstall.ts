import { NextFunction, Request, Response } from 'express';

import logger from '@logger';
import * as credentialsRepository from '@repositories/credentials';

/**
 * Uninstalls the app for a specific school based on the provided school ID.
 *
 * @param req - The HTTP request object, which contains the `schoolId` parameter.
 * @param res - The HTTP response object used to send the response back to the client.
 * @param next - The next middleware function in the Express.js request-response cycle.
 *
 * @throws Will throw an error if no school is found with the provided `schoolId`.
 *
 * @returns A JSON response indicating the success of the uninstallation process.
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
