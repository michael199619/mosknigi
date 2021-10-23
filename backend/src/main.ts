import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from '@nestjs/config';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

export async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true
    });

    app.enableCors({
        origin: '*'
    });

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        validateCustomDecorators: true,
        transformOptions: {
            excludeExtraneousValues: true
        }
    }));

    const options = new DocumentBuilder()
        .setVersion('1.0')
        .setBasePath('api')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);

    const configService: ConfigService = app.get('ConfigService');
    await app.listen(configService.get<number>('app.port'));

    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
