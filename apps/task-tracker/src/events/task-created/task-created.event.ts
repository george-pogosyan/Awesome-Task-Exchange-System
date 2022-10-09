import { StorableEvent } from '@lib/event-sourcing';
import { TASK_EVENT_AGGRAGATE } from 'src/constants';

export class TaskCreatedEvent extends StorableEvent {
  eventAggregate = TASK_EVENT_AGGRAGATE;
  eventVersion = 1;

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
  ) {
    super();
  }
}
