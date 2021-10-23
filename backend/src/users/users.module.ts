import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntities } from './entities';
import { UsersService } from './users.service';

import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([...UsersEntities]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
