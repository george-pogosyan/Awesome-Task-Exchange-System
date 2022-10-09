import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/user/interfaces/user.interface';
import { User } from 'src/user/models/user.model';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserSchema } from 'src/user/schemas/user.schema';
import { GetUserByEmailQuery } from './get-user-by-email.query';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    @InjectModel(UserSchema.name)
    private readonly model: Model<UserSchema & Document>,
    private readonly repository: UserRepository,
  ) {}

  async execute({ email }: GetUserByEmailQuery): Promise<User> {
    const user = await this.model.findOne({ email });
    if (!user) throw new NotFoundException();
    return await this.repository.findOneById(user.id);
  }
}
