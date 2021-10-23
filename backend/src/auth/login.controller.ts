import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Session,
  Response,
} from '@nestjs/common';
import * as Express from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { IRequest } from '../shared/types/request';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth/login')
export class LoginController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(
      @Request() req,
      @Session() session,
  ) {
    return this.authService.login(req.user);
  }

}
