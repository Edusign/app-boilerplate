
import { NextFunction, Request, Response } from 'express';
import * as credentialsRepository from '@repositories/credentials';
import getApiInstance from '@utils/getApiInstance';

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
