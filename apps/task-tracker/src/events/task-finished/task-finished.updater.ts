import { IViewUpdater, ViewUpdaterHandler } from '@lib/event-sourcing';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { TaskSchema } from 'src/shemas/task.schema';
import { TaskFinishedEvent } from './task-finished.event';

@ViewUpdaterHandler(TaskFinishedEvent)
export class TaskFinishedViewUpdater
  implements IViewUpdater<TaskFinishedEvent>
{
  constructor(
    @InjectModel(TaskSchema.name)
    private readonly model: Model<TaskSchema & Document>,
  ) {}

  async handle(event: TaskFinishedEvent): Promise<void> {
    await this.model.updateOne(
      { id: event.id },
      { $set: { id: event.id, isOpen: false } },
      { upsert: true },
    );
  }
}
