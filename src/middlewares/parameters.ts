
import { NextFunction, Request, Response } from 'express';
import { AppParameter, AppParameters } from '@appTypes/parameters';
import { getAppParameters } from '@repositories/parameters';
import logger from '@logger';

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
