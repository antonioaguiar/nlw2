import Knex from "knex";

//todas as atualizações
export async function up(knex: Knex) {
  return knex.schema.createTable("class_schedule", (table) => {
    table.increments("id").primary();

    table.integer("week_day").notNullable();
    table.integer("from").notNullable();
    table.integer("to").notNullable();

    //relacionar com classes
    table
      .integer("class_id")
      .notNullable()
      .references("id")
      .inTable("classes")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

//recuperação, em caso de merda...
export async function down(knex: Knex) {
  return knex.schema.dropTable("users");
}
