import {Body, Controller, Delete, Get, Param, Post, Query, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import {ApiTags, ApiBody, ApiQuery} from "@nestjs/swagger";

@ApiTags('book')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {
  }

  @Get('')
  async getBooks() {
    return await this.booksService.getBooks();
  }

  @Get(':id')
  async getBookById(@Param('id') id: number) {
    return await this.booksService.getBookById(id);
  }

  @Delete(':id')
  async removeBookById(@Param('id') id: number) {
    await this.booksService.removeBookById(id);
  }
}