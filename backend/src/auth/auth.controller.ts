import {Controller, Post, Body, Req, Get, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {RegisterUserDTO} from './dto/auth.dto';
import {Auth} from "../shared/decorators";
import {IRequest} from "../shared/types/request";
import {ApiTags} from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}



}
