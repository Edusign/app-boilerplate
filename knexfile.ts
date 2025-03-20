import { Environment } from "@appTypes/environment/envs";
import { Knex } from "knex";
import path from "path";

export const DBSQLITEFILEPATH = {
    test: path.resolve(process.cwd(), '.db', 'db-test.sqlite'),
    local: path.resolve(process.cwd(), '.db', 'db-local.sqlite'),
    production: path.resolve(process.cwd(), '.db', 'db-production.sqlite'),
}

const knexConfig: {
    [key in Environment]: Knex.Config;
} = {
    test: {
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
    },
    local: {
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
    },
    production: {
        client: "better-sqlite3",
        connection: {
            filename: DBSQLITEFILEPATH.production,
        },
        useNullAsDefault: true,
        migrations: {
            directory: path.resolve(__dirname, "migrations"),
        },
        seeds: {
            directory: path.resolve(__dirname, "seeds"),
        },
    },
};

export default knexConfig;