import Knex from "knex";

//todas as atualizações
export async function up(knex: Knex) {
  return knex.schema.createTable("classes", (table) => {
    table.increments("id").primary();
    table.string("subject").notNullable();
    table.decimal("cost").notNullable();

    //relacionar com usuário
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
}

//recuperação, em caso de merda...
export async function down(knex: Knex) {
  return knex.schema.dropTable("users");
}
