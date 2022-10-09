import { AuthModule } from '@lib/auth';
import { EventSourcingModule } from '@lib/event-sourcing';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { CommandHandlers } from './commands';
import { TaskController } from './controllers/task.controller';
import { UserController } from './controllers/user.controller';
import { EventHandlers, ViewUpdaters } from './events';
import { QueryHandlers } from './queries';
import { TaskRepository } from './repositories/task.repository';
import { Sagas } from './sagas';
import { CompiledTaskSchema, TaskSchema } from './shemas/task.schema';
import { UserSchema } from './shemas/user.schema';

@Module({
  imports: [
    CqrsModule,
    EventSourcingModule.forRoot({
      mongoURL: 'mongodb://localhost:27017/task-manager',
      connectOptions: {},
      collectionsOptions: {
        eventsCollectionName: 'event-store',
        snapshotsCollectionName: 'event-snapshots',
        transactionsCollectionName: 'event-transactions',
      },
    }),
    EventSourcingModule.forFeature(),
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/task-manager', {}),
    MongooseModule.forFeature([
      {
        name: TaskSchema.name,
        schema: CompiledTaskSchema,
      },
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema),
      },
    ]),
  ],
  controllers: [TaskController, UserController],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...ViewUpdaters,
    ...QueryHandlers,
    ...Sagas,
    TaskRepository,
  ],
})
export class AppModule {}
