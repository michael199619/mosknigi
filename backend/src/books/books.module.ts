import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntities } from './entities';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([...BookEntities]),
  ],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
