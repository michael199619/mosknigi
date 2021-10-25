import {Injectable} from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import {EntityManager, LessThan, MoreThan} from 'typeorm';
import {Repository} from 'typeorm';
import { User} from './entities';
import { UserDto }from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly uRepo: Repository<User>,
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {
    }

    public async removeUserById(id: number) : Promise<void> {
        await this.uRepo.delete(id);
    }

    public async getUsers(skip: number, take: number): Promise<User[]> {
        const users = await this.uRepo.find({take, skip, relations: ['history']});
        return users
    }

    public async getUserById(id: number): Promise<User> {
        const user = await this.uRepo.findOne(id, {relations: ['history']});
        return user;
    }

    public async createUser(user): Promise<User> {
        return await this.uRepo.save(user);
    }
}
