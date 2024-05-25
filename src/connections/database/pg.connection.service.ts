import { Inject } from '@nestjs/common';
import { Pool, PoolConfig } from 'pg';

export class PgConnection extends Pool {
  constructor(@Inject('config') config: PoolConfig) {
    super(config);
  }

  async isConnected(): Promise<boolean> {
    try {
      const res = await this.query('SELECT $1::text as connected', [
        'Connection to postgres successful!',
      ]);
      console.log(res.rows[0].connected);
      return true;
    } catch (error) {
      return false;
    }
  }
}
