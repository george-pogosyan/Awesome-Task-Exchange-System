import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from 'src/models/user.model';
import { CreateUserCommand } from './create-user.command';
import { v4 as uuid } from 'uuid';
import { StoreEventBus } from '@lib/event-sourcing';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly eventBus: StoreEventBus) {}

  async execute({ name, role }: CreateUserCommand): Promise<void> {
    const user = new User(uuid()).create(name, role);
    this.eventBus.publishAll(user.getUncommittedEvents());
  }
}
