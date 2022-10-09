import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { User } from '../../models/user.model';
import { UserRepository } from '../../repository/user.repository';
import { GetUserByIdQuery } from './get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  #logger = new Logger(GetUserByIdHandler.name);

  constructor(private readonly repository: UserRepository) {}

  async execute({ id }: GetUserByIdQuery): Promise<User> {
    const user = await this.repository.findOneById(id);
    this.#logger.log(user);
    return user;
  }
}
