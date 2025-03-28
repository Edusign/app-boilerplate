/**
 * Handles the "on_course_edited" webhook event.
 *
 * This function is triggered when a webhook event for "on_course_edited" is received.
 * It logs the incoming request body and sends a success response.
 *
 * @param req - The Express request object containing the webhook payload.
 * @param res - The Express response object used to send the response.
 * @returns A JSON response indicating the webhook was received successfully.
 * 
 * @see https://developers.edusign.com/docs/webhooks-documentation#:~:text=on_course_edited
 */
import logger from '@logger';
import { Request, Response } from 'express';


export default async function onCourseEditedWebhook(req: Request, res: Response) {
  logger.info('Received webhook on_course_edited', {
    body: req.body,
  });

  // Process the webhook payload here
  return res.send({
    success: true,
    message: 'Webhook on_course_edited received successfully',
  });
}
