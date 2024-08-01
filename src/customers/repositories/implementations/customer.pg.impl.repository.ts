import { PgConnection } from 'src/connections/database/pg.connection.service';
import { CustomerRepository } from '../customer.repository';
import { Customer } from 'src/customers/domain/customer.domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerPgRepository implements CustomerRepository {
  constructor(private client: PgConnection) {}

  async insert(customer: Customer): Promise<void> {
    const props = customer.getProps();
    const text =
      'INSERT INTO customers(id, name, email, password, phone, address, is_admin, gender, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';

    const values = [
      props.id,
      props.name,
      props.email,
      props.password,
      props.phone,
      props.address,
      props.is_admin,
      props.gender,
      props.created_at,
      props.updated_at,
    ];

    await this.client.query(text, values);
  }

  async findById(id: string): Promise<Customer | null> {
    const text = 'SELECT * FROM customers WHERE id = $1';
    const value = [id];

    const result = await this.client.query(text, value);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return Customer.create({ ...row });
  }

  async update(customer: Customer): Promise<void> {
    const props = customer.getProps();

    const text =
      'UPDATE customers SET name = $1, email = $2, phone = $3, address = $4, gender = $5, image = $6, updated_at = $7 WHERE id = $8';
    const values = [
      props.name,
      props.email,
      props.phone,
      props.address,
      props.gender,
      props.image,
      props.updated_at,
      props.id,
    ];

    await this.client.query(text, values);
  }

  async delete(id: string): Promise<void> {
    const text = 'DELETE FROM customers WHERE id = $1';
    const value = [id];

    await this.client.query(text, value);
  }

  async findByEmail(email: string) {
    const text = 'SELECT * FROM customers WHERE email = $1';
    const value = [email];

    const result = await this.client.query(text, value);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return Customer.create({ ...row });
  }
}
