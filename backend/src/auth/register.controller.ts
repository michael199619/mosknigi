import {Controller, Get, Post, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class RegisterController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}


  @Get('getKey')
  async register() {
    return {
      key: await this.authService.key()
    };
  }

}
