import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/signup.dto';
import { Signup } from './schema/signup.schema';
import { SignupService } from './signup.service';


@Controller('auth')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('/signup')
  async Signup(
    @Body() userData: CreateUserDto,
  ): Promise<Signup> {
    const saltOrRounds = parseInt(process.env.SALT_OR_ROUNDS);  
    const username = userData.username;
    const password = userData.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.signupService.signup(username, hashedPassword);
    return result;
  }
}
