
import { NextFunction, Request, Response } from 'express';
import logger from '@logger';
import { WebhookError } from '@utils/errors';

export default async function webhookMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        req.webhookType = req.header('x-edusign-webhook-type');
        if (!req.webhookType) {
            logger.error('Webhook type is missing in the request headers');
            return next(new WebhookError('Webhook type is missing', 400));
        }
        return next();
    } catch (error) {
        return next(error);
    }
}
