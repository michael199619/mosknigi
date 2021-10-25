import {Body, Controller, Delete, Get, Param, Post, Query, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, ResponseUserDto } from './dto/user.dto';
import {ApiTags, ApiBody, ApiQuery, ApiOkResponse} from "@nestjs/swagger";
import {BookResponsesDto} from "../books/dto/book.dto";

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiQuery({example: 0, name: 'skip'})
  @ApiQuery({example: 10, name: 'take'})
  @ApiOkResponse({type: [ResponseUserDto]})
  @Get()
  async getUsers(
      @Query('skip') skip: number = 0,
      @Query('take') take: number = 10
  ) {
    return await this.usersService.getUsers(skip, take);
  }

  @ApiOkResponse({type: ResponseUserDto})
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(id);
  }

  @Post('')
  async createUser(@Body() user: UserDto) {
    const {id} = await this.usersService.createUser(user);
    return {id};
  }

  @Delete(':id')
  async removeUserById(@Param('id') id: number) {
    await this.usersService.removeUserById(id);
  }
}