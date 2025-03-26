
import { NextFunction, Request, Response } from 'express';
import { AppParameter, AppParameters } from '@appTypes/parameters';
import { getAppParameters } from '@repositories/parameters';
import logger from '@logger';

/**
 * Middleware to fetch and attach application parameters to the request object.
 * 
 * This middleware attempts to retrieve application parameters from an external API
 * based on the `x-edusign-school-id` and `x-edusign-app-id` headers provided in the request.
 * If the headers are present and valid, it fetches the parameters and assigns them to
 * `req.appParameters`. If an error occurs during the fetch, it logs the error and assigns
 * `null` to `req.appParameters`.
 * 
 * @param req - The incoming HTTP request object.
 * @param res - The outgoing HTTP response object.
 * @param next - The next middleware function in the stack.
 * 
 * @throws Passes any unexpected errors to the next middleware.
 */
export default async function parametersMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        let appParameters: Record<Partial<keyof AppParameters>, AppParameter> | null = null;
        if (req.headers?.['x-edusign-school-id'] && req.headers?.['x-edusign-app-id']) {
            try {
                // Fetching appParameters from the API
                appParameters = await getAppParameters(req.EdusignApi!, req.headers?.['x-edusign-app-id'].toString(), req.headers?.['x-edusign-school-id'].toString());
            } catch (error) {
                logger.error('Error while getting the app parameters on Edusign API, had you installed application ?', error);
            }
        }
        req.appParameters = appParameters;
        return next();
    } catch (error) {
        return next(error);
    }
}
