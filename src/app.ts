import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';

import Edusign from '@_edusign/api';
import logger from '@logger';

import morganMiddleware from '@middlewares/morgan';
import appMiddleware from '@middlewares/app';

import { v1 } from '@routes';

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('An error has occured : ', err);
  const Blocks = new Edusign.Blocks();

  Blocks.Title('error_title', 'An error has occured');

  if (process.env.NODE_ENV === 'production') {
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

  return res.send(Blocks.toJson());
});

export default app;
