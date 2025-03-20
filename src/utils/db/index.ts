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

db.on( 'query', function( queryData ) {
    if (process.env.NODE_ENV !== Environment.LOCAL) return;
    logger.sql('☀️  | ' + db.client.raw(queryData.sql, queryData.bindings).toString());
});

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
        })
}

export default db;
