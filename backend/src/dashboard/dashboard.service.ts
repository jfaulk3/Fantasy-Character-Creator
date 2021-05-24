const knex = require("../db/connection");

function read(user_id: any) {
  return knex("users").select("user_name").where({ user_id }).first();
}

module.exports = { read };
export {};
