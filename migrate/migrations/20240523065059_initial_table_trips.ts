import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('trips', (table) => {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table
      .string('country_id')
      .notNullable()
      .references('id')
      .inTable('countries')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('accomodation').notNullable();
    table.string('eat').notNullable();
    table.integer('days').checkPositive().notNullable();
    table.integer('nights').checkPositive().notNullable();
    table.date('date').notNullable();
    table.integer('price').checkPositive().notNullable();
    table.string('description').notNullable();
    table.string('image').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('trips');
}
