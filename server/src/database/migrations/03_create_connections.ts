import Knex from "knex";

//todas as atualizações
export async function up(knex: Knex) {
  return knex.schema.createTable("connections", (table) => {
    table.increments("id").primary();

    //relacionar com classes
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    table
      .timestamp("create_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
      .notNullable();
  });
}

//recuperação, em caso de merda...
export async function down(knex: Knex) {
  return knex.schema.dropTable("users");
}
