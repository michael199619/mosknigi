import {
  IsString,
  IsPhoneNumber,
  IsOptional,
  MaxLength,
  MinLength,
  IsIn,
  IsNumber,
  IsMobilePhone, IsInt,
} from 'class-validator';

import { UserDto } from '../../users/dto/user.dto';
import {Expose, Transform} from "class-transformer";

export class RegisterUserDTO extends UserDto {

}