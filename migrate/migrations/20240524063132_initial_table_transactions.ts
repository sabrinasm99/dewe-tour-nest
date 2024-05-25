import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary();
    table
      .uuid('customer_id')
      .notNullable()
      .references('id')
      .inTable('customers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.integer('quantity').notNullable();
    table.integer('total_payment').notNullable();
    table
      .enum('status', ['approved', 'waiting approve', 'waiting payment'])
      .notNullable();
    table.string('attachment').nullable();
    table
      .uuid('trip_id')
      .notNullable()
      .references('id')
      .inTable('trips')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.date('booking_date').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transactions');
}
