import { CommandBus, CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { GetAllOpenedTasksQuery } from 'src/queries/get-all-opened-tasks/get-all-opened-tasks.query';
import { TaskSchema } from 'src/shemas/task.schema';
import { AssignTaskCommand } from '../assign-task/assign-task.command';
import { ReshufleTasksCommand } from './reshufle-tasks.command';

@CommandHandler(ReshufleTasksCommand)
export class ReshufleTasksHandler
  implements ICommandHandler<ReshufleTasksCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  async execute(): Promise<void> {
    const tasks = await this.queryBus.execute<GetAllOpenedTasksQuery, TaskSchema[]>(new GetAllOpenedTasksQuery())

    tasks.forEach((task) => this.commandBus.execute(new AssignTaskCommand(task.id)));
  }
}
