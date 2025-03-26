import { NextFunction, Request, Response } from 'express';
import Edusign from '@_edusign/api';
import * as credentialsRepository from '@repositories/credentials';

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
