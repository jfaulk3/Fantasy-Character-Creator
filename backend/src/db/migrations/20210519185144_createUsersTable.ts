import knex, { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.increments("user_id").primary();
    table.string("user_name").notNullable();
    table.string("user_email").notNullable();
    table.string("user_password").notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("users");
}
