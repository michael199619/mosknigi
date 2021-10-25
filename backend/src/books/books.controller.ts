import {Body, Controller, Delete, Get, Param, Post, Query, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import { BooksService } from './books.service';
import {BookDto, BookResponsesDto} from './dto/book.dto';
import {ApiTags, ApiBody, ApiQuery, ApiCreatedResponse, ApiResponse, ApiOkResponse} from "@nestjs/swagger";

@ApiTags('book')
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {
  }

  @ApiQuery({example: 0, name: 'skip'})
  @ApiQuery({example: 10, name: 'take'})
  @ApiOkResponse({type: [BookResponsesDto]})
  @Get('')
  async getBooks(
      @Query('skip') skip: number = 0,
      @Query('take') take: number = 10,
      @Query('userId') userId: number
  ) {
    return await this.booksService.getBooks(skip, take, userId);
  }

  @ApiOkResponse({type: BookResponsesDto})
  @Post('')
  async createBook(@Body() body: BookDto) {
    return await this.booksService.createBook(body);
  }

  @ApiQuery({example: 0, name: 'skip'})
  @ApiQuery({example: 5, name: 'take'})
  @Get('/recommendations')
  async recommendations(
      @Query('userId') userId: number,
      @Query('skip') skip: number = 0,
      @Query('take') take: number = 5
  ) {
    return await this.booksService.recommendations(userId, take, skip);
  }

  @ApiOkResponse({type: BookResponsesDto})
  @Get(':id')
  async getBookById(
      @Param('id') id: number,
      @Query('userId') userId: number
  ) {
    return await this.booksService.getBookById(id, userId);
  }

  @Post(':id/add-favorite')
  async addBookFavoriteById(
      @Param('title') title: string,
      @Query('userId') userId: number
  ) {
    return await this.booksService.addBookFavoriteById(title, userId);
  }

  @Delete(':id/delete-favorite')
  async removeBookFavoriteById(
      @Param('tile') title: string,
      @Query('userId') userId: number
  ) {
    return await this.booksService.removeBookFavoriteById(title, userId);
  }

  @Delete(':id')
  async removeBookById(
      @Param('id') id: number
  ) {
    await this.booksService.removeBookById(id);
  }
}