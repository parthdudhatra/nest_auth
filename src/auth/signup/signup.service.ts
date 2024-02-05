import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DUPLICATE_KEY_ERROR_ALT_CODE, DUPLICATE_KEY_ERROR_CODE, appConstants } from 'src/common/constants';
import { User, UserDocument } from '../../schema/user.schema';
import { CreateUserDto } from './dto/signup.dto';

@Injectable()
export class SignupService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  async signup(username: string, password: string): Promise<User> {
    try {
      const newUser = await this.userModel.create({
        username,
        password,
    });
      return newUser;
    } catch (error) {
      if (error.code === DUPLICATE_KEY_ERROR_CODE || error.code === DUPLICATE_KEY_ERROR_ALT_CODE) {
        throw new ConflictException(appConstants.errorMessage.UsernameIsAlready);
      } else {
        throw error;
      }
    }
  }

  async getUser(query: {}): Promise<User> {
    try {
      const user = await this.userModel.findOne(query);
      if (!user) {
        throw new NotFoundException(appConstants.errorMessage.UserNotFound);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
