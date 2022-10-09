import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSourcingModule } from '@lib/event-sourcing';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    EventSourcingModule.forRoot({
      mongoURL: 'mongodb://localhost:27017/auth',
      connectOptions: {},
      collectionsOptions: {
        eventsCollectionName: 'event-store',
        snapshotsCollectionName: 'event-snapshots',
        transactionsCollectionName: 'event-transactions',
      },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/auth', {}),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
