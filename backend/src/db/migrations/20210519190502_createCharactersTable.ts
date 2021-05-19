import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("characters", (table: Knex.TableBuilder) => {
    table.increments("character_id").primary();
    table.string("name").notNullable();
    table.integer("age");
    table.string("birthday");
    table.string("birthplace");
    table.string("image_url");
    table.text("summary");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("characters");
}
