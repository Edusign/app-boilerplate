import { NextFunction, Request, Response } from 'express';
import Edusign from '@_edusign/api';

export default async function hmacValidatorMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const hmacTester = new Edusign.Webhooks(req.clientSecret!);

    if (!hmacTester.verifyWebhookSignature(req.hmac!, JSON.stringify(req.body))) {
      throw new Error('HMAC validation failed');
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
