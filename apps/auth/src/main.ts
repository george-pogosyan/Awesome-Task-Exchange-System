import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { dropMVCollections } from 'scripts/drop-mv-collections';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // only fo debug
  await dropMVCollections(app);

  await app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9094'],
      },
      consumer: {
        groupId: 'auth',
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(4004, '0.0.0.0', async () => {
    Logger.log(`Listen on: ${await app.getUrl()}`);
  });
}

bootstrap();
