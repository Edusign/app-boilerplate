import { Environment } from "@appTypes/environment/envs";
import { Knex } from "knex";
import path from "path";

/**
 * An object containing file paths for SQLite database files
 * used in different environments.
 *
 * @property test - The file path for the SQLite database used in the test environment.
 * @property local - The file path for the SQLite database used in the local development environment.
 * @property production - The file path for the SQLite database used in the production environment.
 */
export const DBSQLITEFILEPATH = {
    test: path.resolve(process.cwd(), '.db', 'db-test.sqlite'),
    local: path.resolve(process.cwd(), '.db', 'db-local.sqlite'),
    production: path.resolve(process.cwd(), '.db', 'db-production.sqlite'),
}

/**
 * Common database configuration object for a SQLite3 database using the `better-sqlite3` client.
 * 
 * @property {string} client - The database client to use, set to "better-sqlite3".
 * @property {object} connection - Connection settings for the database.
 * @property {string} connection.filename - Path to the SQLite database file.
 * @property {boolean} useNullAsDefault - Indicates whether `NULL` should be used as the default value for columns.
 * @property {object} migrations - Configuration for database migrations.
 * @property {string} migrations.directory - Path to the directory containing migration files.
 * @property {object} seeds - Configuration for database seed files.
 * @property {string} seeds.directory - Path to the directory containing seed files.
 */
const commonDBConfig = {
    client: "better-sqlite3",
    connection: {
        filename: DBSQLITEFILEPATH.local,
    },
    useNullAsDefault: true,
    migrations: {
        directory: path.resolve(__dirname, "migrations"),
    },
    seeds: {
        directory: path.resolve(__dirname, "seeds"),
    },
}

/**
 * Configuration object for Knex, defining database settings for different environments.
 *
 * @typeParam Environment - A string literal type representing the possible environments (e.g., 'test', 'local', 'production').
 * @typeParam Knex.Config - The configuration type provided by Knex for database connections.
 *
 * @property test - Configuration for the 'test' environment, inheriting common database settings.
 * @property local - Configuration for the 'local' environment, inheriting common database settings.
 * @property production - Configuration for the 'production' environment, inheriting common database settings
 * and overriding the database connection filename with a production-specific value.
 */
const knexConfig: {
    [key in Environment]: Knex.Config;
} = {
    test: {
        ...commonDBConfig,
        connection: {
            ...commonDBConfig.connection,
            filename: DBSQLITEFILEPATH.test,
        },
    },
    local: {
        ...commonDBConfig,
        connection: {
            ...commonDBConfig.connection,
            filename: DBSQLITEFILEPATH.local,
        },
    },
    production: {
        ...commonDBConfig,
        connection: {
            ...commonDBConfig.connection,
            filename: DBSQLITEFILEPATH.production,
        },
    },
};

export default knexConfig;