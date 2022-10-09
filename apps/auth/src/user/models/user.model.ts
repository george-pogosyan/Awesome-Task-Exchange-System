import { AggregateRoot } from '@nestjs/cqrs';
import { IUSER_ROLE, USER_ROLES } from '../constants';
import { UserCreatedEvent } from '../events/user-created/user-created.event';
import { UserDeactivatedEvent } from '../events/user-deactivated/user-deactivated.event';

export class User extends AggregateRoot {
  public id: string;
  public email: string;
  public name: string;
  #password: string;
  public role: IUSER_ROLE;
  public isActive: boolean = true;

  constructor(id: string) {
    super();
    this.id = id;
    return this;
  }

  create(email: string, name, password: string, role: IUSER_ROLE): User {
    if (!email) throw new Error('email is required');
    if (!name) throw new Error('name is required');
    if (!password) throw new Error('password is required');
    if (!role && !Object.values(USER_ROLES).includes(role))
      throw new Error('role is required');

    this.apply(new UserCreatedEvent(this.id, email, name, password, role));
    return this;
  }

  deactivate(): User {
    this.apply(new UserDeactivatedEvent(this.id))
    return this
  }

  checkPasswordMatch(password: string) {
    return password === this.#password;
  }

  private onUserCreatedEvent({
    email,
    name,
    password,
    role,
  }: UserCreatedEvent) {
    this.email = email;
    this.name = name;
    this.#password = password;
    this.role = role;
  }

  private onUserDeactivatedEvent() {
    this.isActive = false
  }
}
