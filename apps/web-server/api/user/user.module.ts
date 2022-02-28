import { Module } from '@nestjs/common';
import { BaseModule } from 'api/base/base.module';
import { UserController } from './user.controller';
import { UserProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [BaseModule],
  providers: [...UserProviders, UserService],
  controllers: [UserController],
})
export class UserModule {}
