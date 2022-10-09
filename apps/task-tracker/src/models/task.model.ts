import { AggregateRoot } from '@nestjs/cqrs';
import { TaskAssignedEvent } from 'src/events/task-assigned/task-assigned.event';
import { TaskCreatedEvent } from 'src/events/task-created/task-created.event';
import { TaskFinishedEvent } from 'src/events/task-finished/task-finished.event';

export class Task extends AggregateRoot {
  public id: string;
  public title: string;
  public description: string;
  public assigner: string;
  public isOpen = true;

  constructor(id: string) {
    super();
    this.id = id;
    return this;
  }

  createTask(title: string, description: string): Task {
    this.apply(new TaskCreatedEvent(this.id, title, description));
    return this;
  }

  assignTask(assigners: { id: string }[] = []): Task {
    const assigner = assigners[Math.floor(Math.random() * assigners.length)];

    this.apply(new TaskAssignedEvent(this.id, assigner.id));
    return this;
  }

  finishTask(): Task {
    this.apply(new TaskFinishedEvent(this.id));
    return this;
  }

  private onTaskCreatedEvent({ title, description }: TaskCreatedEvent) {
    this.title = title;
    this.description = description;
  }

  private onTaskAssignedEvent({ assigner }: TaskAssignedEvent) {
    this.assigner = assigner;
  }

  private onTaskFinishedEvent(event: TaskFinishedEvent) {
    this.isOpen = false;
  }
}
