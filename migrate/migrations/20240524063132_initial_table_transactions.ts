import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary();
    table
      .uuid('customer_id')
      .notNullable()
      .references('id')
      .inTable('customers')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
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
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT');
    table.timestamp('booking_date', { useTz: true }).notNullable();
    table
      .timestamp('created_at', { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .timestamp('updated_at', { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transactions');
}
