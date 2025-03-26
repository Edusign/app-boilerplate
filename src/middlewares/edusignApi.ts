
import { NextFunction, Request, Response } from 'express';
import * as credentialsRepository from '@repositories/credentials';
import getApiInstance from '@utils/getApiInstance';

/**
 * Middleware to initialize and attach the Edusign API instance and school credentials
 * to the request object for further use in the application.
 *
 * @param req - The incoming HTTP request object.
 * @param res - The outgoing HTTP response object.
 * @param next - The next middleware function in the stack.
 *
 * @throws Will throw an error if no school credentials are found for the provided school ID.
 *
 * @remarks
 * - This middleware retrieves the school credentials using the `schoolId` from the request.
 * - It initializes the Edusign API instance using the retrieved API key.
 * - The middleware attaches the API instance and credentials (`apiKey`, `clientId`, `clientSecret`)
 *   to the request object for downstream use.
 */
export default async function edusignApiMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const schoolCredentials = await credentialsRepository.getSchoolCredentials(req.schoolId!);
        if (!schoolCredentials){
            throw new Error('No school found');
        }

        req.EdusignApi = await getApiInstance(schoolCredentials.api_key);
        
        req.apiKey = schoolCredentials.api_key;
        req.clientId = schoolCredentials.client_id;
        req.clientSecret = schoolCredentials.client_secret;
        
        return next();
    } catch (error) {
        return next(error);
    }
}
