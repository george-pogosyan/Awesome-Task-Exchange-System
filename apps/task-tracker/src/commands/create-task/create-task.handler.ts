import { StoreEventBus } from '@lib/event-sourcing';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Task } from '../../models/task.model';
import { CreateTaskCommand } from './create-task.command';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from 'src/shemas/user.schema';
import { Document, Model } from 'mongoose';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private readonly eventBus: StoreEventBus,
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserSchema & Document>,
  ) {}

  async execute({ title, description }: CreateTaskCommand): Promise<Task> {
    const task = new Task(uuid())
      .createTask(title, description)

    this.eventBus.publishAll(task.getUncommittedEvents());

    return task;
  }
}
