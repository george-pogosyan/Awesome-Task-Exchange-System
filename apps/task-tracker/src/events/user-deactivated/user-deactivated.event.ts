import { StorableEvent } from '@lib/event-sourcing';
import { USER_EVENT_AGGRAGATE } from '../../constants';

export class UserDeactivatedEvent extends StorableEvent {
  eventAggregate = USER_EVENT_AGGRAGATE;
  eventVersion = 1;

  constructor(public readonly id: string) {
    super();
  }
}
