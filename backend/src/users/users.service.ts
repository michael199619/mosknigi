import {Injectable} from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import {EntityManager, LessThan, MoreThan} from 'typeorm';
import {Repository} from 'typeorm';
import {Role, User} from './entities';
import { UserDto }from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly uRepo: Repository<User>,
        @InjectRepository(Role)
        private readonly rRepo: Repository<Role>,
        @InjectEntityManager()
        private entityManager: EntityManager
    ) {
    }

    public async removeUserById(id: number) : Promise<void> {
        await this.uRepo.delete(id);
    }

    public async getUsers(role?: string): Promise<User[]> {
        const users = this.entityManager.createQueryBuilder(User, 'user');

        if (role) {
            users.leftJoinAndSelect(Role, 'role', '"roleId" = user.id')
                .where('role.name = :role', {role});
        }

        return await users.getMany();
    }

    public async getRoles(): Promise<Role[]> {
        return await this.rRepo.find();
    }

    public async getUserById(id: number): Promise<User> {
        const user = await this.entityManager.createQueryBuilder(User, 'user')
            .where('user.id = :id', {id})
            .getOne();

        return user;
    }

    public async createUser(user): Promise<User> {
        return await this.uRepo.save(user);
    }

    public async createUsers(user): Promise<User> {
        return await this.uRepo.save(user);
    }
}
