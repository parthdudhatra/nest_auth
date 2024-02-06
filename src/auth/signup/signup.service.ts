import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection, ERROR_CODE, statusMessage } from 'src/common/constants';
import { User, UserDocument } from '../../schema/user.schema';

@Injectable()
export class SignupService {
  constructor(
    @InjectModel(Collection.USER) private readonly userModel: Model<UserDocument>,
  ) {}
  async signup(username: string, password: string): Promise<User> {
    try {
      const newUser = await this.userModel.create({
        username,
        password,
    });
      return newUser;
    } catch (error) {
      if (error.code === ERROR_CODE.DUPLICATE_KEY_ERROR_CODE || error.code === ERROR_CODE.DUPLICATE_KEY_ERROR_ALT_CODE) {
        throw new ConflictException(statusMessage.errorMessage.UsernameIsAlready);
      } else {
        throw error;
      }
    }
  }

  async getUser(query: {}): Promise<User> {
    try {
      const user = await this.userModel.findOne(query);
      if (!user) {
        throw new NotFoundException(statusMessage.errorMessage.UserNotFound);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
