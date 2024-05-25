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
    table.integer('quota').notNullable();
    table.integer('booked_slots').notNullable().defaultTo(0);
    table.string('accomodation').notNullable();
    table.string('eat').notNullable();
    table.integer('days').notNullable();
    table.integer('nights').notNullable();
    table.date('date').notNullable();
    table.integer('price').notNullable();
    table.string('description').notNullable();
    table.string('image').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('trips');
}
