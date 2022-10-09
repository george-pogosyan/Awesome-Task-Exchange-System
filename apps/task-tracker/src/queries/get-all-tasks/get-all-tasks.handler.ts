import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskSchema } from 'src/shemas/task.schema';
import { GetAllTasksQuery } from './get-all-tasks.query';

@QueryHandler(GetAllTasksQuery)
export class GetAllTasksHandler implements IQueryHandler<GetAllTasksQuery> {
  constructor(
    @InjectModel(TaskSchema.name)
    private readonly model: Model<TaskSchema & Document>,
  ) {}

  async execute(): Promise<(TaskSchema & Document)[]> {
    return this.model
      .find({}, { _id: 0 })
      .populate({ path: 'assigner', select: { _id: 0, assignerId: 0 } });
  }
}
