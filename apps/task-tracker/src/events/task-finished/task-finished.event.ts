import { StorableEvent } from '@lib/event-sourcing';
import { TASK_EVENT_AGGRAGATE } from 'src/constants';

export class TaskFinishedEvent extends StorableEvent {
  eventAggregate = TASK_EVENT_AGGRAGATE;
  eventVersion = 1;

  constructor(public readonly id: string) {
    super();
  }
}
