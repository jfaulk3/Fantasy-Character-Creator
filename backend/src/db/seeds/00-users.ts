import { Knex } from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      user_name: "test_name",
      user_email: "test_email@email.com",
      user_password: "test_password",
    },
  ]);
}
