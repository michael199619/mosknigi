import {Test} from '@nestjs/testing';
import {UsersController} from '../src/users/users.controller';
import {UsersService} from '../src/users/users.service';
import {INestApplication} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from '../src/users/users.module';
import * as request from 'supertest';
import {AppConfigModule} from "../src/config/config.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ConnectionOptions} from "typeorm";
import {SeedService} from "../src/db/seed.service";

describe('Api', () => {
    let usersController: UsersController;
    let usersService: UsersService;
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                AppConfigModule,
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => configService.get<ConnectionOptions>('db'),
                }),
                UsersModule
            ],
            providers: [SeedService],
            exports: [SeedService]
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    let userId: number;

    afterAll(async () => {
        await app.close();
    });
});