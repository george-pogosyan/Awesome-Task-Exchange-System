import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user/create-user.command';
import { IUSER_ROLE } from './constants';
import { User } from './models/user.model';
import { GetUserByEmailQuery } from './queries/get-user-by-email/get-user-by-email.query';
import { GetUserByIdQuery } from './queries/get-user-by-id/get-user-by-id.query';

@Injectable()
export class UserService {
  #logger = new Logger(UserService.name);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createNewUser({
    email,
    name,
    password,
    role,
  }: {
    email: string;
    name: string;
    password: string;
    role: IUSER_ROLE;
  }) {
    await this.commandBus.execute(
      new CreateUserCommand(email, name, password, role),
    );
  }

  async findUserById(id: string) {
    const user = await this.queryBus.execute<GetUserByIdQuery, User>(
      new GetUserByIdQuery(id),
    );

    this.#logger.log(JSON.stringify(user));
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.queryBus.execute<GetUserByEmailQuery, User>(
      new GetUserByEmailQuery(email),
    );

    this.#logger.log(JSON.stringify(user));
    return user;
  }
}
