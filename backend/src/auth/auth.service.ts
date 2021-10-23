import {
  Injectable,
  BadRequestException,
  UnauthorizedException, ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { getPasswordHash } from '../shared/utils';
import { User} from '../users/entities';
import {RegisterUserDTO} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  public async key() {
    return this.jwtService.sign({
      date: new Date()
    })
  }

  public async validateUser(email: string, pwd: string): Promise<any> {
    // const user = await this.usersService.getByEmail(email);
    // if (user && user.status !== 'BLOCK' && getPasswordHash(pwd, user.salt) === user.pwdHash) {
    //   return user;
    // }
    // throw new UnauthorizedException('password is invalid');
  }

  public async login(user: User) {

  }

  public async register(data: RegisterUserDTO) {

  }

  public async mvPassword(userId: number, oldPassword: string, newPassword: string) {console.log(oldPassword, userId);
    // const user = await this.usersService.getById(userId);
    //
    // if (getPasswordHash(oldPassword, user.salt) !== user.pwdHash) {
    //   throw new ForbiddenException();
    // }


  }
}
