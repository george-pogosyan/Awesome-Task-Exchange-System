import { GetAllUsersHandler } from './get-all-users/get-all-users.handler';
import { GetUserByEmailHandler } from './get-user-by-email/get-user-by-email.handler';
import { GetUserByIdHandler } from './get-user-by-id/get-user-by-id.handler';

export const QueryHandlers = [
  GetAllUsersHandler,
  GetUserByEmailHandler,
  GetUserByIdHandler,
];
