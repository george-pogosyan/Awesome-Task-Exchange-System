import { StoreEventBus } from '@lib/event-sourcing';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskRepository } from 'src/repositories/task.repository';
import { FinishTaskCommand } from './finish-task.command';

@CommandHandler(FinishTaskCommand)
export class FinishClassHandler implements ICommandHandler<FinishTaskCommand> {
  constructor(
    private readonly repository: TaskRepository,
    private readonly eventBus: StoreEventBus,
  ) {}

  async execute({ taskId }: FinishTaskCommand): Promise<void> {
    const task = await this.repository.findOneById(taskId);
    task.finishTask();

    this.eventBus.publishAll(task.getUncommittedEvents());
  }
}
