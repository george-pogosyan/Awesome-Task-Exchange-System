import { StorableEvent } from '@lib/event-sourcing';
import { EVENT_AGGRAGATE, IUSER_ROLE } from '../../constants';

export class UserDeactivatedEvent extends StorableEvent {
  eventAggregate = EVENT_AGGRAGATE;
  eventVersion = 1;

  constructor(public readonly id: string) {
    super();
  }
}
