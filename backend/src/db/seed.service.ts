import {Injectable} from '@nestjs/common';
import {InjectEntityManager} from '@nestjs/typeorm';
import {EntityManager} from 'typeorm';
import {User} from '../users/entities';
import fixtures from './fixtures';
import users from './books';
import fetch from 'node-fetch';
import async from 'async';
import {ConfigService} from "@nestjs/config";
import {Book} from "../books/entities";

@Injectable()
export class SeedService {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager,
        private serviceConfig: ConfigService
    ) {
    }

    async onModuleInit() {
        console.log('[Seed started]');
        const {knigi} = this.serviceConfig.get('api');
        const usersDb = {};
        // if (await this.entityManager.findOne(User)) {
        //     console.log('[Seed success]');
        //     return false;
        // }

        await async.eachLimit(users, 15, (async (user) => {
            const text = user.source_url.split('/');
            const id = text[text.length-2];
            usersDb[user.user_id] = usersDb[user.user_id] || {books: []};
            usersDb[user.user_id].id = user.user_id;
            const book = {
                url: user.source_url,
                status: user.event === 'create_order' ? 'ORDER' : 'ADD'
            } as any;

            try {
                const {bookInfo} = await fetch(`${knigi}/aisearch/abis_frontapi/v2/book/?in_stock=false&is_online=false&edition=&id=${id}`)
                    .then(e => e.json());

                const params = bookInfo.items.reduce((prev, next) => {
                    return {
                        ...prev,
                        [next.title]: next.value
                    }
                }, {});

                book.id = id;
                book.title = bookInfo.title;
                book.author = params['Автор'];
                book.lang = params['Язык издания'];
                book.about = params['Сведения о заглавии'];
                book.age = params['Возрастные ограничения'];
                book.theme = params['Тематика'];
                book.release_year = params['Год издания'];
                usersDb[user.user_id].books.push(book);
            } catch (e) {
                console.log(e)
            }
        }));

        const books = {};
        Object.keys(usersDb).forEach((k) => {
            usersDb[k].books.forEach(e => {
                books[e.id] = e;
            })
        });

        await this.entityManager.delete(Book, {})
        await this.entityManager.delete(User, {})

        const saveBooks = await this.entityManager.save(Book, Object.keys(books).map(k => books[k]));
        await this.entityManager.save(User, Object.keys(usersDb).map((k) => ({
            id: usersDb[k].id,
            history: usersDb[k].books.map(e => saveBooks.find(b => e.url === b.url))
        })));

        console.log('[Creating User started]');

    }
}
