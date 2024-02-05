import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DUPLICATE_KEY_ERROR_ALT_CODE, DUPLICATE_KEY_ERROR_CODE, appConstants } from 'src/common/constants';
import { Signup, UserDocument } from './schema/signup.schema';

@Injectable()
export class SignupService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  async signup(username: string, password: string): Promise<Signup> {
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

  async getUser(query: {}): Promise<Signup> {
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
