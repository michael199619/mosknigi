import {Injectable} from '@nestjs/common';
import {InjectEntityManager} from '@nestjs/typeorm';
import {EntityManager} from 'typeorm';
import {User} from '../users/entities';
import fixtures from './fixtures';

@Injectable()
export class SeedService {
    constructor(
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {}

    async onModuleInit() {
        console.log('[Seed started]');

        if (await this.entityManager.findOne(User)) {
            console.log('[Seed success]');
            return false;
        }

        console.log('[Creating User started]');

        await this.entityManager.save(User, fixtures.users as User[]);

        console.log('[Creating Role started]');
    }
}
