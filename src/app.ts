import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';

import Edusign from '@_edusign/api';
import logger from '@logger';

import morganMiddleware from '@middlewares/morgan';
import appMiddleware from '@middlewares/app';
import { v1 } from '@routes';
import { Environment } from '@appTypes/environment/envs';

const app = express();

app.use(bodyParser.json());

// Add http logging
app.use(morganMiddleware);

// Add app information to the request
app.use(appMiddleware);

// Add routes
app.use('/v1', v1);

// Generic 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.error(`HTTP [${req.method}] Route ${req.path} not found`);
  next();
});

// Generic error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('An error has occured : ', {
    name: err.name,
    error: err.message,
    stack: err.stack?.split('\n').map(stack => stack.trim()).slice(1),
  });
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
