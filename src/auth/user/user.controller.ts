import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { User } from './schema/users.schema';
import { CreateUserDto } from '../dto/auth.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('/signup')
  async createUser(
    @Body() userData: CreateUserDto,
  ): Promise<User> {
    const saltOrRounds = parseInt(process.env.SALT_OR_ROUNDS);  
    const username = userData.username;
    const password = userData.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(username, hashedPassword);
    return result;
  }
}
