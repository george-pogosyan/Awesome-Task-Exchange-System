import { EventStore } from '@lib/event-sourcing';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TASK_EVENT_AGGRAGATE } from 'src/constants';
import { Task } from 'src/models/task.model';

@Injectable()
export class TaskRepository {
  #logger = new Logger(TaskRepository.name);

  constructor(private readonly eventStore: EventStore) {}

  async findOneById(id: string): Promise<Task> {
    const task = new Task(id);

    const events = await this.eventStore.getEvents(TASK_EVENT_AGGRAGATE, id);

    if (!events.length) throw new NotFoundException();

    task.loadFromHistory(events);

    return task;
  }
}
