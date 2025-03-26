import { NextFunction, Request, Response } from 'express';
import Edusign from '@_edusign/api';
import * as credentialsRepository from '@repositories/credentials';

/**
 * Middleware to validate HMAC signatures for incoming requests.
 * 
 * This middleware ensures that the request's HMAC signature is valid by using
 * the client secret associated with the request. If the client secret is not
 * provided in the request, it attempts to retrieve it from the credentials repository.
 * 
 * @param req - The incoming HTTP request object.
 * @param res - The outgoing HTTP response object.
 * @param next - The next middleware function in the chain.
 * 
 * @throws {Error} If the client secret is not found or the HMAC validation fails.
 * 
 * @remarks
 * - The `req.clientSecret` is either provided in the request or fetched using the `req.schoolId`.
 * - The HMAC signature is verified using the `Edusign.Webhooks` utility.
 * - If validation fails, an error is passed to the next middleware.
 */
export default async function hmacValidatorMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    let clientSecret = req.clientSecret;
    if (!clientSecret) {
      clientSecret = await credentialsRepository.getSchoolClientSecret(req.schoolId!);
    }

    if (!clientSecret) {
      throw new Error('Client secret not found - Is the app installed?');
    }

    req.clientSecret = clientSecret;

    const hmacTester = new Edusign.Webhooks(clientSecret);

    if (!hmacTester.verifyWebhookSignature(req.hmac!, JSON.stringify(req.body))) {
      throw new Error('HMAC validation failed');
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
