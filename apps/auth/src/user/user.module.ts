import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { EventSourcingModule } from '@lib/event-sourcing';
import { CommandHandlers } from './commands';
import { KAFKA_INJECT_SYMBOL } from './constants';
import { EventsHandlers, ViewUpdaters } from './events';
import { QueryHandlers } from './queries';
import { UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CudStreamAdapter } from './adapters/cud-stream.adapter';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_INJECT_SYMBOL,
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9094'],
            clientId: 'user-service',
          },
          consumer: {
            groupId: 'user-service-consumer',
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
    CqrsModule,
    EventSourcingModule.forFeature(),
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema),
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    ...CommandHandlers,
    ...EventsHandlers,
    ...ViewUpdaters,
    ...QueryHandlers,
    UserRepository,
    UserService,
    CudStreamAdapter,
  ],
  exports: [UserService],
})
export class UserModule {}
