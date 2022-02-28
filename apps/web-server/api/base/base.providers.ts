import { DATABASE_CONNECTION } from 'api/constants';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () =>
      createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'modern',
        entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
        // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
        synchronize: true,
        // debug: true,
      }),
  },
];
