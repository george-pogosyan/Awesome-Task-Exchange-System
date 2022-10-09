import { StorableEvent } from '@lib/event-sourcing';
import { USER_EVENT_AGGRAGATE } from 'src/constants';

export class UserCreatedEvent extends StorableEvent {
  eventAggregate = USER_EVENT_AGGRAGATE;
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly role: string,
  ) {
    super();
  }
}
