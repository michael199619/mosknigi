import {Body, Controller, Delete, Get, Param, Post, Query, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import {ApiTags, ApiBody, ApiQuery} from "@nestjs/swagger";

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Get('roles')
  async getRoles() {
    return await this.usersService.getRoles();
  }

  @Get()
  @ApiQuery({name:'role',required: false})
  async getUsers( @Query('role') role: string = '') {
    return await this.usersService.getUsers(role);
  }

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