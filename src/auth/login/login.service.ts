import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { statusMessage } from 'src/common/constants';
import { LoginUserDto } from './dto/login.dto';
import { User } from '../../schema/user.schema';
import { SignupService } from '../signup/signup.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly signupService: SignupService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<User> {
    try {
      const user = await this.signupService.getUser({ username });

      if (!user) {
        throw new NotAcceptableException(statusMessage.errorMessage.NotFindUser);
      }

      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid) {
        throw new NotAcceptableException(
          statusMessage.errorMessage.InvalidPassword,
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
      message: statusMessage.successMessage.LoginSuccess,
      access_token: this.jwtService.sign(payload),
    };
  }
}
