import { DATABASE_CONNECTION, USER_REPOSITORY } from 'api/constants';
import { Connection } from 'typeorm';
import { User } from '../entities/user.entity';

export const UserProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
];
