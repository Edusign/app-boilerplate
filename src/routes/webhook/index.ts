/**
 * Defines the webhook routes and middleware for handling incoming webhook requests.
 * 
 * This module sets up an Express router to handle POST requests to the webhook endpoint.
 * It validates the request using a series of middleware functions and dispatches the request
 * to the appropriate webhook handler based on the `webhookType` provided in the request.
 * 
 * Middleware:
 * - `edusignApiMiddleware`: Ensures the request is authenticated with the Edusign API.
 * - `hmacValidatorMiddleware`: Validates the HMAC signature of the request.
 * - `parametersMiddleware`: Validates and parses request parameters.
 * - `webhookMiddleware`: Extracts and sets the `webhookType` from the request.
 * 
 * Webhook Handlers:
 * - `onCourseEdited`: Handles the `on_course_edited` webhook type.
 * - Additional handlers can be added to the `webhookRoutes` object.
 * 
 * Error Handling:
 * If the `webhookType` is not supported, a `WebhookError` is thrown with a 422 status code.
 * 
 * @module WebhookRouter
 * @requires express
 * @requires ./onCourseEdited
 * @requires @middlewares/hmacValidator
 * @requires @middlewares/parameters
 * @requires @middlewares/edusignApi
 * @requires @middlewares/webhook
 * @requires @utils/errors
 * 
 * @example
 * // Example of adding a new webhook handler:
 * webhookRoutes['new_webhook_type'] = (req, res, next) => {
 *     // Handle the new webhook type
 * };
 * 
 * @see https://developers.edusign.com/docs/webhooks-documentation
 */
import { NextFunction, Request, Response, Router } from 'express';

import onCourseEdited from './onCourseEdited';

import hmacValidatorMiddleware from '@middlewares/hmacValidator';
import parametersMiddleware from '@middlewares/parameters';
import edusignApiMiddleware from '@middlewares/edusignApi';
import webhookMiddleware from '@middlewares/webhook';
import { WebhookError } from '@utils/errors';

const webhookRoutes: Record<string, (req: Request, res: Response, next: NextFunction) => void> = {
    'on_course_edited': (req, res, next) => onCourseEdited(req, res),
    // ... Add other webhook handlers here
};

const router = Router();

router.post(
    '/', 
    edusignApiMiddleware, 
    hmacValidatorMiddleware, 
    parametersMiddleware, 
    webhookMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
        const webhookType = req.webhookType!;
        const handler = webhookRoutes[webhookType];
        if (!handler) {
            return next(new WebhookError(`Webhook type ${webhookType} is not supported`, 422));
        }
        return handler(req, res, next);
    }
);

export default router;
