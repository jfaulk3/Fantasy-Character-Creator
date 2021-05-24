import { Knex } from "knex";
const bcrypt = require("bcrypt");

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

  //Encrypt user password
  async function passwordDigest(password: string) {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(password, salt);
  }

  // Inserts seed entries
  await knex("users").insert([
    {
      user_name: "test_name",
      user_email: "test_email@email.com",
      user_password: await passwordDigest("test_password"),
    },
    {
      user_name: "Fake Joker",
      user_email: "jokeman@email.com",
      user_password: await passwordDigest("jack123"),
    },
    {
      user_name: "Michael Jordan",
      user_email: "airjordan@email.com",
      user_password: await passwordDigest("dontmeanathingwithoutthering"),
    },
  ]);
}
