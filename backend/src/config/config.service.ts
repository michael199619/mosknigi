import {registerAs} from '@nestjs/config';
import {UsersEntities} from '../users/entities';
import {BookEntities} from "../books/entities";

export const app = registerAs('app', () => ({
    port: process.env.APP_PORT
}));

export const api = registerAs('api', () => ({
    knigi: process.env.KNIGi
}));

export const jwt = registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET_KEY,
    expires: process.env.JWT_SECRET_EXPIRES
}));

export const db = registerAs('db', () => ({
    type: 'postgres',
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    migrationsRun: false,
    entities: [
        ...UsersEntities,
        ...BookEntities
    ],
    logging: true,
    synchronize: true,
}));