import {Injectable} from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import {EntityManager, LessThan, MoreThan} from 'typeorm';
import {Repository} from 'typeorm';
import {Book} from './entities';
import { BookDto }from './dto/book.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bRepo: Repository<Book>,
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {
    }

    public async removeBookById(id: number) : Promise<void> {
        await this.bRepo.delete(id);
    }

    public async getBooks(): Promise<Book[]> {
        const books = this.entityManager.createQueryBuilder(Book, 'book');

        return await books.getMany();
    }

    public async getBookById(id: number): Promise<Book> {
        const book = await this.entityManager.createQueryBuilder(Book, 'book')
            .where('book.id = :id', {id})
            .getOne();

        return book;
    }
}
