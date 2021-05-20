const knex = require("../db/connection");

function list(user_id: any) {
  return knex("users").select("user_name").where({ user_id }).first();
}

module.exports = { list };
export {};
