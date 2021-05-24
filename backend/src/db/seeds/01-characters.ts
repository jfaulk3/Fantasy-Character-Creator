import { Knex } from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE characters RESTART IDENTITY CASCADE");

  // Inserts seed entries
  await knex("characters").insert([
    {
      character_name: "fake character",
      character_age: 23,
      character_gender: "male",
      character_birthday: "23rd of Hearthfire",
      character_birthplace: "High Rock",
      character_summary:
        "A fake character that doesn't exist anywhere on the planet Earth, hopefully...",
      user_id: 2,
    },
    {
      character_name: "The lonely salesman",
      character_age: 55,
      character_gender: "unknown",
      character_birthday: "11th of September",
      character_birthplace: "Seattle,, Washington",
      character_summary:
        "A merchant who spent so much time feeding ambition, they neglected their relationships with friends and family",
      user_id: 2,
    },
  ]);
}
