import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserStatus } from 'api/entities/user.entity';
import { USER_REPOSITORY } from 'api/constants';

@Injectable()
export class LoginService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
  ) {}

  login(account: string, password: string) {
    return this.userRepository.findOne({
      where: {
        mobile: account,
        password,
        state: UserStatus.NORMAL,
      },
    });
  }
}
