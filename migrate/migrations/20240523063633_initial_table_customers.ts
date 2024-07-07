import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('customers', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.string('email').notNullable().unique();
    table.string('phone').notNullable();
    table.text('address').notNullable();
    table.boolean('is_admin').notNullable().defaultTo(false);
    table.enum('gender', ['male', 'female']).notNullable();
    table.string('image').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('customers');
}
