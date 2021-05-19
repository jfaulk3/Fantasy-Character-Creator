export {};
require("dotenv").config();
require("ts-node/register");
const {
  NODE_ENV = "development",
  DEVELOPMENT_DATABASE_URL,
  PRODUCTION_DATABASE_URL,
} = process.env;

const DATABASE_URL =
  NODE_ENV === "production"
    ? PRODUCTION_DATABASE_URL
    : DEVELOPMENT_DATABASE_URL;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },

  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory: __dirname + "/src/db/migrations",
    },
    seeds: {
      directory: __dirname + "/src/db/seeds",
    },
  },
};
