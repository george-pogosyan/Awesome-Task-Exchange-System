import { IViewUpdater, ViewUpdaterHandler } from '@lib/event-sourcing';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { TaskRepository } from 'src/repositories/task.repository';
import { TaskSchema } from 'src/shemas/task.schema';
import { TaskCreatedEvent } from './task-created.event';

@ViewUpdaterHandler(TaskCreatedEvent)
export class TaskCreatedViewUpdater implements IViewUpdater<TaskCreatedEvent> {
  constructor(
    @InjectModel(TaskSchema.name)
    private readonly model: Model<TaskSchema & Document>,
    private readonly repository: TaskRepository,
  ) {}

  async handle(event: TaskCreatedEvent): Promise<void> {
    const task = await this.repository.findOneById(event.id);
    await this.model.updateOne(
      { id: event.id },
      {
        $set: {
          id: task.id,
          title: task.title,
          description: task.description,
          isOpen: task.isOpen,
        },
      },
      { upsert: true },
    );
  }
}
