const knex = require("../db/connection");
import { character } from "../interfaces/interfaces";

function list(user_id: number): Array<string | number> {
  return knex("characters").select("*").where({ user_id });
}

function read(user_id: number, character_id: number): object {
  return knex("characters")
    .select("*")
    .where({ user_id, character_id })
    .first();
}

function create(user_id: number, data: character) {
  return knex("characters")
    .insert({ ...data, user_id })
    .where({ user_id });
}

function update(character_id: number, data: character) {
  return knex("characters")
    .update({ ...data }, "*")
    .where({ character_id });
}

function destroy(character_id: number) {
  return knex("characters").where({ character_id }).del();
}

module.exports = { list, read, create, update, delete: destroy };
export {};
