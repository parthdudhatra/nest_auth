import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../../middleware/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { LoginController } from './login.controller';
import { SignupModule } from '../signup/signup.module';
import { userSchema } from '../../schema/user.schema';
import { SignupService } from '../signup/signup.service';
import { CollectionName, appConstants } from 'src/common/constants';

@Module({
  imports: [
    SignupModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: CollectionName.USER, schema: userSchema }]),
  ],
  providers: [LoginService, SignupService, JwtStrategy],
  controllers: [LoginController]
})
export class LoginModule {}
