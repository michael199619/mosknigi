import {Body, Controller, Delete, Get, Param, Post, Query, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import { BooksService } from './books.service';
import {BookDto, BookResponsesDto} from './dto/book.dto';
import {ApiTags, ApiBody, ApiQuery, ApiCreatedResponse, ApiResponse, ApiOkResponse} from "@nestjs/swagger";

@ApiTags('book')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {
  }

  @ApiOkResponse({type: [BookResponsesDto]})
  @Get('')
  async getBooks() {
    return await this.booksService.getBooks();
  }

  @ApiOkResponse({type: BookResponsesDto})
  @Post('')
  async createBook(@Body() body: BookDto) {
    return await this.booksService.createBook(body);
  }

  @Get('/recommendations')
  async recommendations(@Param('id') id: number) {
    return await this.booksService.recommendations(id);
  }

  @ApiOkResponse({type: BookResponsesDto})
  @Get(':id')
  async getBookById(@Param('id') id: number) {
    return await this.booksService.getBookById(id);
  }

  @Post(':id/add-favorite')
  async addBookFavoriteById(@Param('id') id: number) {
    return await this.booksService.addBookFavoriteById(id);
  }

  @Delete(':id/delete-favorite')
  async removeBookFavoriteById(@Param('id') id: number) {
    return await this.booksService.removeBookFavoriteById(id);
  }

  @Delete(':id')
  async removeBookById(@Param('id') id: number) {
    await this.booksService.removeBookById(id);
  }
}