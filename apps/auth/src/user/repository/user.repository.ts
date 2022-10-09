import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventStore } from '@lib/event-sourcing';
import { EVENT_AGGRAGATE } from '../constants';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository {
  #logger = new Logger(UserRepository.name);

  constructor(private readonly eventStore: EventStore) {}

  async findOneById(id: string): Promise<User> {
    const user = new User(id);
    const events = await this.eventStore.getEvents(EVENT_AGGRAGATE, id);
    this.#logger.log(events);
    if (!events.length) throw new NotFoundException();
    user.loadFromHistory(events);
    this.#logger.log(user);
    this.#logger.log(JSON.stringify(user));
    return user;
  }
}
