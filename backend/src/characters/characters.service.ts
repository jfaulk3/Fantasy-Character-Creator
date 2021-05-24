const knex = require("../db/connection");

function list(user_id: number) {
  console.log(user_id);
  return knex("characters").select("*").where({ user_id });
}

module.exports = { list };
export {};
