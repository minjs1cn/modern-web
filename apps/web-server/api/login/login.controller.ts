import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'api/common/filters/http-exception.filter';
import { LoginService } from './login.service';

@UseFilters(HttpExceptionFilter)
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() data: { account: string; password: string }) {
    const res = await this.loginService.login(data.account, data.password);
    return res;
  }
}
