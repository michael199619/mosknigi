import { Module } from '@nestjs/common';
import {app, db, jwt, api} from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [app, db, jwt, api]
        })
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class AppConfigModule {}