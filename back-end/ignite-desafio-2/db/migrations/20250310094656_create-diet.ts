import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("diet", (table) => {
    table.uuid("id").primary();
    table.uuid("author").notNullable();
    table.text("title").notNullable();
    table.text("description").notNullable();
    table.boolean("on_diet").notNullable();
    table.text("date").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("diet");
}
