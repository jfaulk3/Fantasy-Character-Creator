import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("characters", (table: Knex.TableBuilder) => {
    table.increments("character_id").primary();
    table.string("character_name").notNullable();
    table.integer("character_age");
    table.string("character_gender");
    table.string("character_birthday");
    table.string("character_birthplace");
    table.string("character_image_url");
    table.text("character_summary");
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("characters");
}
