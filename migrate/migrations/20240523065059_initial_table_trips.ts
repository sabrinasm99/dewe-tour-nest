import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('trips', (table) => {
    table.uuid('id').primary();
    table.string('title').notNullable();
    table
      .uuid('country_id')
      .notNullable()
      .references('id')
      .inTable('countries')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('quota').notNullable();
    table.integer('booked_slots').notNullable().defaultTo(0);
    table.string('accomodation').notNullable();
    table.string('transportation').notNullable();
    table.string('eat').notNullable();
    table.integer('days').notNullable();
    table.integer('nights').notNullable();
    table.timestamp('date', { useTz: true }).notNullable();
    table.integer('price').notNullable();
    table.text('description').notNullable();
    table.string('image').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('trips');
}
