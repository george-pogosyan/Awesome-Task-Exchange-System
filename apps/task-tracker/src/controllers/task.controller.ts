import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard, Roles } from '@lib/auth';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from 'src/commands/create-task/create-task.command';
import { ReshufleTasksCommand } from 'src/commands/reshufle-tasks/reshufle-tasks.command';
import { FinishTaskCommand } from 'src/commands/finish-task/finish-task.command';
import { GetAllOpenedTasksQuery } from 'src/queries/get-all-opened-tasks/get-all-opened-tasks.query';

@Controller({
  path: 'tasks',
  version: '1',
})
@UseGuards(RolesGuard)
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('')
  @Roles('worker', 'manager', 'admin')
  getAllTasks() {
    return this.queryBus.execute(new GetAllOpenedTasksQuery());
  }

  @Post('')
  @Roles('worker', 'manager', 'admin')
  async createTask(@Body() task: { name: string; description: string }) {
    return await this.commandBus.execute(
      new CreateTaskCommand(task.name, task.description),
    );
  }

  @Post('reshufle-tasks')
  @Roles('manager', 'admin')
  async reshufleTasks() {
    await this.commandBus.execute(new ReshufleTasksCommand());
  }

  @Post('finish-task/:id')
  @Roles('worker', 'admin')
  async finishTask(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.commandBus.execute(new FinishTaskCommand(id));
  }
}
