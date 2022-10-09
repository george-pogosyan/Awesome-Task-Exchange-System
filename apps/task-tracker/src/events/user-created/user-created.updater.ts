import { IViewUpdater, ViewUpdaterHandler } from '@lib/event-sourcing';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { UserSchema } from 'src/shemas/user.schema';
import { UserCreatedEvent } from './user-created.event';

@ViewUpdaterHandler(UserCreatedEvent)
export class UserCreatedViewUpdater implements IViewUpdater<UserCreatedEvent> {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly model: Model<UserSchema & Document>,
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    await new this.model({
      id: event.id,
      name: event.name,
      role: event.role,
    }).save();
  }
}
