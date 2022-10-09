import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CudStreamAdapter } from 'src/user/adapters/cud-stream.adapter';
import { UserCreatedEvent } from './user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly cudStreamAdapter: CudStreamAdapter) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    this.cudStreamAdapter.publishUserCreatedEvent({
      event: 'UserCreated',
      payload: {
        id: event.id,
        name: event.name,
        email: event.email,
        role: event.role,
      },
    });
  }
}
