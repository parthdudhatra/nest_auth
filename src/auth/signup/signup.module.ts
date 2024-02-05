import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { userSchema } from '../../schema/user.schema';
import { CollectionName, appConstants } from 'src/common/constants';

@Module({
  imports: [MongooseModule.forFeature([{ name: CollectionName.USER, schema: userSchema }])],
  providers: [SignupService],
  controllers: [SignupController],
})
export class SignupModule {}
