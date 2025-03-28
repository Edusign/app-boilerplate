import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';

import Edusign from '@_edusign/api';
import logger from '@logger';

import morganMiddleware from '@middlewares/morgan';
import appMiddleware from '@middlewares/app';
import { v1, webhook } from '@routes';
import { Environment } from '@appTypes/environment/envs';
import { WebhookError } from '@utils/errors';

const app = express();

app.use(bodyParser.json());

// Add http logging
app.use(morganMiddleware);

// Add app information to the request
app.use(appMiddleware);

// Add routes
app.use('/v1', v1);
app.use('/webhook', webhook);

// Generic 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.error(`HTTP [${req.method}] Route ${req.path} not found`);
  next();
});

// Generic error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (typeof err === 'string') {
    err = new Error(err);
  }

  logger.error('An error has occured : ', {
    name: err.name,
    error: err.message,
    stack: err.stack?.split('\n').map(stack => stack.trim()).slice(1),
  });

  if (err instanceof WebhookError) {
    const webhookErrorResponse: {
      status: string;
      message: string;
      stack?: string[];
      name?: string
    } = {
      status: 'error',
      message: err.message,
    };
    if (process.env.NODE_ENV !== Environment.PRODUCTION) {
      webhookErrorResponse.name = err.name;
      webhookErrorResponse.stack = err.stack?.split('\n').map(stack => stack.trim()).slice(1);
    }
    res.status(err.code).json(webhookErrorResponse);
    return;
  }

  /**
   * An instance of the `Edusign.Blocks` class.
   * 
   * This object is used to manage and interact with blocks within the application.
   * Ensure that the `Edusign` library is properly imported and initialized before
   * using this instance.
   */
  const Blocks = new Edusign.Blocks();

  Blocks.Title('error_title', 'An error has occured');

  if (process.env.NODE_ENV === Environment.PRODUCTION) {
    Blocks.Error('error_message', err?.message || 'Cannot retrieve message');
  } else {
    Blocks.Error('error_message', err?.message || 'Cannot retrieve message');
    Blocks.Keyvalue('error_detail', [{
      key: 'Name',
      value: err?.name || 'Cannot retrieve error name',
    },
    {
      key: 'Message',
      value: err?.stack || 'Cannot retrieve error stack trace',
    }]);
  }

  // Sending 200 status code to avoid blocking the request
  // but the error will be displayed in the response for displaying error detail information
  res.send(Blocks.toJson());
});

export default app;
