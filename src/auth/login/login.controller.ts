import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/logindto';

@Controller('auth')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: LoginUserDto) {
    return this.loginService.login(req);
  }
}
