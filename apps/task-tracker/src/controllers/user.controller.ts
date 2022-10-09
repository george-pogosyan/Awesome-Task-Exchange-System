import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserCreatedMessage, USER_STREAM_TOPIC } from '@lib/contracts';
import { CreateUserCommand } from '../commands/create-user/create-user.command';

@Controller()
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern(USER_STREAM_TOPIC)
  async userStream(@Payload() { event, payload }: UserCreatedMessage) {
    switch (event) {
      case 'UserCreated':
        await this.commandBus.execute(
          new CreateUserCommand(payload.id, payload.name, payload.role),
        );
    }
  }
}
