import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { instance } from '../logger/winston.logger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger({
            instance: instance,
        }),
    });

    const config = new DocumentBuilder()
        .setTitle('API')
        .addTag('users')
        .addTag('posts')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, document);

    const logger = new Logger();
    const port = process.env.PORT ?? 3000;

    await app.listen(port).then(() => {
        logger.log(`Listening on port ${port}`, 'Bootstrap');
    });
}
bootstrap();