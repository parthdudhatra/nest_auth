import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './auth/user/user.controller';
import { UserModule } from './auth/user/user.module';
import { UserService } from './auth/user/user.service';
import { AuthModule } from './auth/auth/auth.module';
import { AuthService } from './auth/auth/auth.service';
import { AuthController } from './auth/auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
