import { AppManagementBody } from '@appTypes/express';
import logger from '@logger';
import * as credentialsRepository from '@repositories/credentials';
import { NextFunction, Request, Response } from 'express';


/**
 * Handles the installation of an application by processing the request body
 * and storing the provided credentials in the repository.
 *
 * @param req - The HTTP request object containing the body with installation parameters.
 * @param res - The HTTP response object used to send the response back to the client.
 * @param next - The next middleware function in the Express.js pipeline.
 *
 * @throws Will throw an error if `schoolId` or `clientId` is missing in the request body.
 * @throws Will throw an error if `apiKey` or `clientSecret` is missing in the request body.
 *
 * The request body should include the following properties:
 * - `token` (apiKey): The API key for authentication.
 * - `schoolId`: The unique identifier of the school.
 * - `client_secret` (clientSecret): The client secret for authentication.
 * - `client_id` (clientId): The client ID for authentication.
 *
 * Logs the installation parameters and stores the credentials in the `credentialsRepository`.
 * Responds with a success message upon successful installation.
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
