import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import {jwtFromRequest} from '../../shared/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private uService: UsersService,
      private configService: ConfigService
  ) {
    super({
      jwtFromRequest,
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    if (payload.date) {
      throw new UnauthorizedException('jwt token invalid or expired');
    }

    return payload;
  }
}
