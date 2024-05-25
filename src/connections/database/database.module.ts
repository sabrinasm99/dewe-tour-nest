import { DynamicModule, Module } from '@nestjs/common';
import { PoolConfig } from 'pg';
import { PgConnection } from './pg.connection.service';

@Module({})
export class DatabaseModule {
  static forRoot(config: PoolConfig): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      providers: [{ provide: 'config', useValue: config }, PgConnection],
      exports: [PgConnection],
    };
  }
}
