import { StoreEventBus } from '@lib/event-sourcing';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from 'src/user/models/user.model';
import { DeactivateUserCommand } from './deactivate-user.command';

@CommandHandler(DeactivateUserCommand)
export class DeactivateUserHandler
  implements ICommandHandler<DeactivateUserCommand>
{
  constructor(
    private readonly eventBus: StoreEventBus
  ) { }

  async execute(command: DeactivateUserCommand): Promise<void> {
    const user = new User(command.id).deactivate()
    this.eventBus.publishAll(user.getUncommittedEvents());
  }
}
