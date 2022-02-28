import { Module } from '@nestjs/common';
import { BaseModule } from 'api/base/base.module';
import { LoginController } from './login.controller';
import { LoginProviders } from './login.providers';
import { LoginService } from './login.service';

@Module({
  imports: [BaseModule],
  providers: [...LoginProviders, LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
