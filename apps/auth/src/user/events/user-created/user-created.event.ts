import { StorableEvent } from '@lib/event-sourcing';
import { EVENT_AGGRAGATE, IUSER_ROLE } from '../../constants';

export class UserCreatedEvent extends StorableEvent {
  eventAggregate = EVENT_AGGRAGATE;
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
    public readonly role: IUSER_ROLE,
  ) {
    super();
  }
}
