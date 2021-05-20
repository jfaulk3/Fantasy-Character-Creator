import { Knex } from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

  // Inserts seed entries
  await knex("users").insert([
    {
      user_name: "test_name",
      user_email: "test_email@email.com",
      user_password: "test_password",
    },
  ]);
}
