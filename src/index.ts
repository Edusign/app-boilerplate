import "source-map-support/register";
import logger from '@logger';
import app from './app';
import { initializeDatabase } from "@db";
import { Server } from "http";

const port = 3000;

const exitHandler = (server: Server) => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (server: Server) => (error: any) => {
  logger.error(error);
  exitHandler(server);
};

const SIGTERMHandler = (server: Server) => () => {
  logger.info('SIGTERM received');
  exitHandler(server);
};

const unhandledRejectionHandler = (error: any) => {
  logger.error(error);
};

const startServer = async () => {
  await initializeDatabase();
  // Start the server
  const server = app.listen(port, () => {
    logger.info(`Server started : http://localhost:${port}`);
  });

  process.on('uncaughtException', unexpectedErrorHandler(server));
  process.on('unhandledRejection', unhandledRejectionHandler);
  process.on('SIGTERM', SIGTERMHandler(server));

  return server;
};

startServer();