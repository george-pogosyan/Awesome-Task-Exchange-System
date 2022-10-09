import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9094'],
      },
      consumer: {
        groupId: 'accounting',
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(4001, '0.0.0.0', async () => {
    Logger.log(`Listen on: ${await app.getUrl()}`);
  });
}

bootstrap();
