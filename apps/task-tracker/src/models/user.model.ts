import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from 'src/events/user-created/user-created.event';
import { UserDeactivatedEvent } from 'src/events/user-deactivated/user-deactivated.event';

export class User extends AggregateRoot {
  public id: string;
  public name: string;
  public role: string;
  public isActive: boolean = true

  constructor(id: string) {
    super();
    this.id = id;
    return this;
  }

  create(name: string, role: string): User {
    this.apply(new UserCreatedEvent(this.id, name, role));
    return this;
  }

  deactivate(): User {
    this.apply(new UserDeactivatedEvent(this.id))
    return this
  }

  private onUserCreatedEvent({ name, role }: UserCreatedEvent) {
    this.name = name;
    this.role = role;
  }

  private onUserDeactivatedEvent() {
    this.isActive = false
  }
}
