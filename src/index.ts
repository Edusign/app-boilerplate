/**
 * Entry point of the application.
 * 
 * This file initializes the application by setting up the server, database, and
 * process event handlers for graceful shutdown and error handling.
 * 
 * It imports necessary modules, defines utility functions for handling process
 * events, and starts the HTTP server on the specified port.
 * 
 * Key functionalities:
 * - Initializes the database connection.
 * - Starts the HTTP server.
 * - Handles uncaught exceptions and unhandled promise rejections.
 * - Gracefully shuts down the server on termination signals.
 * 
 * @module index
 */
import "source-map-support/register";
import logger from '@logger';
import app from './app';
import { initializeDatabase } from "@db";
import { Server } from "http";

/**
 * The port number on which the application will listen for incoming requests.
 * @constant
 * @type {number}
 */
const port = 3000;

/**
 * Handles the application exit process by closing the provided server instance
 * and logging the shutdown event. If no server is provided, the process exits immediately.
 *
 * @param server - The server instance to be closed. If `null` or `undefined`, the process exits directly.
 */
const exitHandler = (server: Server) => {
  if (server) {
    server.close(() => {
      logger.info('Serveur arrêté, fin du processus ...');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

/**
 * Handles unexpected errors by logging the error and invoking the exit handler.
 *
 * @param server - The server instance that will be passed to the exit handler.
 * @returns A function that takes an error object, logs it, and calls the exit handler.
 */
const unexpectedErrorHandler = (server: Server) => (error: any) => {
  logger.error(error);
  exitHandler(server);
};

/**
 * Creates a handler function for the SIGTERM signal.
 * This handler logs the signal reception and invokes the exit handler for the provided server.
 *
 * @param server - The server instance that needs to be gracefully shut down.
 * @returns A function to handle the SIGTERM signal.
 */
const SIGTERMHandler = (server: Server) => () => {
  logger.info('SIGTERM received');
  exitHandler(server);
};

/**
 * Handles unhandled promise rejections by logging the error.
 *
 * @param error - The error object or value associated with the unhandled rejection.
 */
const unhandledRejectionHandler = (error: any) => {
  logger.error(error);
};

/**
 * Starts the server after initializing the database and sets up
 * handlers for various process events such as uncaught exceptions,
 * unhandled promise rejections, and termination signals.
 *
 * @async
 * @function
 * @returns {Promise<import('http').Server>} The HTTP server instance.
 */
const startServer = async () => {
  await initializeDatabase();
  // Start the server
  const server = app.listen(port, () => {
    logger.info(`Serveur démarré et accessible via l'url http://localhost:${port}`);
  });

  process.on('uncaughtException', unexpectedErrorHandler(server));
  process.on('unhandledRejection', unhandledRejectionHandler);
  process.on('SIGTERM', SIGTERMHandler(server));

  return server;
};

// Start the server
startServer();