import { InjectModel } from '@nestjs/mongoose';
import { IViewUpdater, ViewUpdaterHandler } from '@lib/event-sourcing';
import { Model } from 'mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { UserCreatedEvent } from './user-created.event';
import { Logger } from '@nestjs/common';

@ViewUpdaterHandler(UserCreatedEvent)
export class UserCreatedViewUpdater implements IViewUpdater<UserCreatedEvent> {
  #logger = new Logger(UserCreatedViewUpdater.name);
  constructor(
    @InjectModel(UserSchema.name)
    private readonly model: Model<UserSchema & Document>,
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    try {
      await this.model.updateOne(
        { id: event.id },
        {
          $set: {
            id: event.id,
            email: event.email,
            name: event.name,
            password: event.password,
            role: event.role,
          },
        },
        { upsert: true },
      );
    } catch (error) {
      this.#logger.error(error);
    }
  }
}
