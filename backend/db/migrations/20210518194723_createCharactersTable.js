exports.up = function (knex) {
  return knex.schema.createTable("characters", (table) => {
    table.increments("character_id").primary();
    table.string("name");
    table.integer("age");
    table.string("birthday");
    table.string("birthplace");
    table.text("summary");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("characters");
};
