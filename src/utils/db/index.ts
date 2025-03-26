/**
 * @fileoverview This module provides utilities for initializing and configuring
 * a Knex.js database instance. It includes functionality for setting up the
 * database connection, handling migrations, and seeding the database.
 *
 * The module exports the following:
 * - `currentConfig`: The current Knex.js configuration based on the environment.
 * - `currentDBFilePath`: The file path to the SQLite database file for the current environment.
 * - `initializeDatabase`: A function to initialize the database connection and perform setup tasks.
 * - `db`: The configured Knex.js database instance.
 *
 * @module utils/db
 */
import * as Knex from "knex";
import path from "path";
import fs from 'fs';

import logger from "@logger";
import knexConfig, { DBSQLITEFILEPATH } from "@knexConfig";
import { Environment } from "@appTypes/environment/envs";

export const currentConfig = knexConfig[process.env.NODE_ENV || Environment.LOCAL];
export const currentDBFilePath = DBSQLITEFILEPATH[process.env.NODE_ENV || Environment.LOCAL];

const dbPath = path.resolve(__dirname, currentDBFilePath);
const isFirstConnection = !fs.existsSync(dbPath);

/**
 * Initializes and configures a Knex.js database instance.
 *
 * The database instance is configured using the provided `currentConfig` object,
 * which contains the necessary connection details. Additionally, it sets up
 * custom logging functions for various log levels (warn, error, deprecate, debug)
 * using the provided `logger` object.
 *
 * @constant
 * @type {Knex}
 * @property {Object} log - Custom logging functions for Knex.js.
 * @property {Function} log.warn - Function to handle warning messages.
 * @property {Function} log.error - Function to handle error messages.
 * @property {Function} log.deprecate - Function to handle deprecation messages.
 * @property {Function} log.debug - Function to handle debug messages.
 * @property {boolean} useNullAsDefault - Specifies whether to use `NULL` as the default value for undefined fields.
 * @property {boolean} compileSqlOnError - Enables SQL compilation on error for debugging purposes.
 */
const db = Knex.knex({
    ...currentConfig,
    log: {
        warn: logger.warn,
        error: logger.error,
        deprecate: logger.debug,
        debug: logger.debug,
    },
    useNullAsDefault: true,
    compileSqlOnError: true,
});

/**
 * Logs the SQL queries executed by the database instance.
 * 
 * This event listener logs the SQL queries executed by the database instance
 * to the console. It is only enabled in the local environment to prevent
 * sensitive information from being exposed in production.
 * 
 * @event
 * @param {Object} queryData - The data object containing the SQL query and bindings.
 * @param {string} queryData.sql - The SQL query string.
 * @param {Array} queryData.bindings - The query parameter bindings.
 * @listens db#query
 * @returns {void}
 * @see {@link https://knexjs.org/#Interfaces-Events}
 */
db.on( 'query', function( queryData ) {
    if (process.env.NODE_ENV !== Environment.LOCAL) return;
    logger.sql('☀️  | ' + db.client.raw(queryData.sql, queryData.bindings).toString());
});

/**
 * Initializes the database connection and performs necessary setup.
 *
 * This function establishes a connection to the database by executing a raw SQL query.
 * If it is the first connection, it performs the following additional steps:
 * - Runs the latest database migrations.
 * - Executes the database seed scripts.
 *
 * Logs messages to indicate the progress and completion of each step.
 *
 * @returns A promise that resolves to the database instance once the initialization is complete.
 */
export const initializeDatabase = () => {
    return db.raw("SELECT 1")
        .then(async () => {
            logger.info("🎉 Base de données connectée 🎉");
            if (isFirstConnection) {
                logger.info("⌛ Première migration de la DB en cours... ⏳");
                await db.migrate.latest();
                await db.seed.run();
                logger.info("🎉 Migration de la DB terminée 🎉");
            }
            return db;
        })
}

export default db;
