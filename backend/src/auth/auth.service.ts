const knex = require("../db/connection");

function readEmail(email: string) {
  return knex("users").select("*").where({ user_email: email }).first();
}

function create(name: string, email: string, bcryptPassword: string) {
  return knex("users")
    .insert(
      {
        user_name: name,
        user_email: email,
        user_password: bcryptPassword,
      },
      "*"
    )
    .then((createdRecord: any) => createdRecord[0]);
}

module.exports = { readEmail, create };
