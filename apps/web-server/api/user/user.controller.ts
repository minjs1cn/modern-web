import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'api/common/filters/http-exception.filter';
import { UserService } from './user.service';

@UseFilters(HttpExceptionFilter)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getList(
    @Param() { page = 1, size = 10 }: { page?: number; size?: number },
  ) {
    const res = await this.userService.getList(page, size);
    return res;
  }
}
