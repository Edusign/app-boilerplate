import type { Knex } from "knex";
import { TableNames, AppCredentialColumns } from "@appTypes/databases";

export async function up(knex: Knex): Promise<void> {
    if (!await knex.schema.hasTable(TableNames.APP_CREDENTIALS)) {
        await knex.schema.createTable(TableNames.APP_CREDENTIALS, (table) => {
            table.increments(AppCredentialColumns.ID).primary();
            table.string(AppCredentialColumns.API_KEY, 255).nullable();
            table.string(AppCredentialColumns.SCHOOL_ID, 20).nullable().unique().index();
            table.text(AppCredentialColumns.CLIENT_ID);
            table.text(AppCredentialColumns.CLIENT_SECRET);
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(TableNames.APP_CREDENTIALS);
}