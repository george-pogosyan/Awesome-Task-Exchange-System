import { IViewUpdater, ViewUpdaterHandler } from '@lib/event-sourcing';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { TaskSchema } from 'src/shemas/task.schema';
import { TaskAssignedEvent } from './task-assigned.event';

@ViewUpdaterHandler(TaskAssignedEvent)
export class TaskAssignedViewUpdater
  implements IViewUpdater<TaskAssignedEvent>
{
  constructor(
    @InjectModel(TaskSchema.name)
    private readonly model: Model<TaskSchema & Document>,
  ) {}

  async handle(event: TaskAssignedEvent): Promise<void> {
    await this.model.updateOne(
      {
        id: event.id,
      },
      {
        $set: {
          id: event.id,
          assignerId: event.assigner,
        },
      },
      {
        upsert: true,
      },
    );
  }
}
