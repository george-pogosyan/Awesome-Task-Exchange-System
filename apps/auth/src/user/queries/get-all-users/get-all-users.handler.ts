import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { GetAllUsersQuery } from './get-all-users.query';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly model: Model<UserSchema & Document>,
  ) {}

  async execute(query: GetAllUsersQuery) {
    return await this.model.find({}, { _id: 0, password: 0 }).lean();
  }
}
