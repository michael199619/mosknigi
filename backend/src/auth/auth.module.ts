import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

import { Strategies } from './strategies';
import { AuthController } from './auth.controller';
import { LoginController } from './login.controller';
import { RegisterController } from './register.controller'
import {AppConfigModule} from "../config/config.module";

@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt').secret,
        signOptions: {
          expiresIn: configService.get('jwt').expires
        }
      })
    })
  ],
  controllers: [AuthController, LoginController, RegisterController],
  providers: [AuthService, ...Strategies],
})
export class AuthModule {}
