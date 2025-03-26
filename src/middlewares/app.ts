import { NextFunction, Request, Response } from 'express';

/**
 * Middleware function to process and attach various request properties
 * from headers and body to the `req` object for downstream usage.
 *
 * @param req - The HTTP request object, extended to include additional properties:
 *   - `schoolId` (string | undefined): The school ID, extracted from the request body or headers.
 *   - `appId` (string | undefined): The application ID, extracted from the headers.
 *   - `lang` (string): The language preference, extracted from the headers or defaults to 'en'.
 *   - `hmac` (string | undefined): The HMAC signature, extracted from the headers.
 *   - `userId` (string | undefined): The user ID, extracted from the request body.
 *   - `location` (string | undefined): The location, extracted from the request body.
 *   - `studentId` (string | undefined): The student ID, extracted from the request body context.
 *   - `teacherId` (string | undefined): The teacher ID, extracted from the request body context.
 *   - `externalId` (string | undefined): The external ID, extracted from the request body context.
 *   - `groupId` (string | undefined): The group ID, extracted from the request body context.
 *   - `clientId` (string | undefined): The client ID, extracted from the request body.
 *   - `clientSecret` (string | undefined): The client secret, extracted from the request body.
 *   - `apiKey` (string | undefined): The API key, extracted from the request body.
 *   - `appParameters` (null): Reserved for future use, currently set to `null`.
 * @param res - The HTTP response object.
 * @param next - The next middleware function in the request-response cycle.
 *
 * @throws {Error} If the `schoolId` is missing from both the request body and headers.
 */
export default async function appMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Getting school and app id from the headers
    req.schoolId = req.body.schoolId || req.headers?.['x-edusign-school-id']?.toString();

    if (!req.schoolId) {
      throw new Error('School id is missing');
    }

    req.appId = req.headers?.['x-edusign-app-id']?.toString();
    req.lang = req.headers?.['x-edusign-lang']?.toString() || 'en';
    req.hmac = req.headers?.['x-edusign-hmac']?.toString();
    req.userId = req.body?.caller?.userId;
    req.location = req.body?.LOCATION;

    req.studentId = req.body?.context?.studentId;
    req.teacherId = req.body?.context?.teacherId;
    req.externalId = req.body?.context?.externalId;
    req.groupId = req.body?.context?.groupId;

    req.clientId = req.body?.client_id;
    req.clientSecret = req.body?.client_secret;
    req.apiKey = req.body?.token;

    req.appParameters = null;
    
    return next();
  } catch (error) {
    return next(error);
  }
}
