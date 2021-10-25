import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository, InjectEntityManager} from '@nestjs/typeorm';
import {EntityManager, LessThan, MoreThan} from 'typeorm';
import {Repository} from 'typeorm';
import {Book} from './entities';
import {BookDto, BookResponsesDto} from './dto/book.dto';
import {User} from "../users/entities";

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bRepo: Repository<Book>,
        @InjectRepository(User)
        private readonly uRepo: Repository<User>,
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {
    }

    public async removeBookById(id: number): Promise<void> {
        await this.bRepo.delete(id);
    }

    public async getBooks(skip: number, take: number, userId: number): Promise<Book[]> {
        const user = await this.uRepo.findOne(userId, {relations: ['history']});
        if (!user) {
            throw new NotFoundException()
        }

        const qb = this.entityManager.createQueryBuilder(Book, 'book');
        qb.take(take);
        qb.skip(skip);
        const books = await qb.getMany();
        books.forEach((book) => {
            book.favorite = !!user.history.find(h => h.title === book.title)
        });

        return books;
    }

    public async getBookById(id: number, userId: number): Promise<Book> {
        const user = await this.uRepo.findOne(userId, {relations: ['history']});
        if (!user) {
            throw new NotFoundException()
        }

        const book = await this.entityManager.createQueryBuilder(Book, 'book')
            .where('book.id = :id', {id})
            .getOne();
        book.favorite = !!user.history.find(h => h.title === book.title);

        return book;
    }

    public async createBook(body: BookDto): Promise<BookResponsesDto> {
        return await this.bRepo.save(body);
    }

    public async recommendations(userId: number, take: number, skip: number): Promise<Book[]> {
        const user = await this.uRepo.findOne(userId, {
            relations: ['history', 'history.users', 'history.users.history']
        });

        if (!user) {
            throw new NotFoundException()
        }

        const recBooks = {};
        user.history.forEach((book) => {
            book.users.forEach((user) => {
                if (user.id === userId) {
                    return;
                }

                user.history.forEach((rBook) => {
                   if (rBook.title === book.title) {
                       return;
                   }

                   recBooks[rBook.title] = recBooks[rBook.title] || rBook;
                   recBooks[rBook.title].range = recBooks[rBook.title].range || 0;
                   recBooks[rBook.title].range++;

                   if (rBook.status === 'OLDER') {
                       recBooks[rBook.title].range = recBooks[rBook.title].range + 0.5;
                   }
                });
            });
        });

        return Object.keys(recBooks)
            .map(k => recBooks[k])
            .sort((a, b) => a.range - b.range)
            .slice(skip, take);
    }

    public async removeBookFavoriteById(title: string, userId: number): Promise<void> {
        const user = await this.uRepo.findOne(userId, {relations: ['history']});
        if (!user) {
            throw new NotFoundException()
        }

        user.history = user.history.filter(e => e.title !== title);
        await this.uRepo.save(user);
    }

    public async addBookFavoriteById(title: string, userId: number): Promise<void> {
        const user = await this.uRepo.findOne(userId, {relations: ['history']});
        const book = await this.bRepo.findOne({title});

        if (!user || !book) {
            throw new NotFoundException()
        }

        user.history.push(book);
        await this.uRepo.save(user);
    }
}
