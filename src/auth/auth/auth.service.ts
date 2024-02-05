import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../dto/auth.dto';
import { appConstants } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.getUser({ username });

      if (!user) {
        throw new NotAcceptableException(appConstants.errorMessage.NotFindUser);
      }

      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        throw new NotAcceptableException(
          appConstants.errorMessage.InvalidPassword,
        );
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
  async login(user: LoginUserDto) {
    const payload = { username: user.username, sub: user._id };
    return {
      message: appConstants.successMessage.LoginSuccess,
      access_token: this.jwtService.sign(payload),
    };
  }
}
