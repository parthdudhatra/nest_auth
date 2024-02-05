import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { SignupSchema } from './schema/signup.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: SignupSchema }])],
  providers: [SignupService],
  controllers: [SignupController],
})
export class SignupModule {}
