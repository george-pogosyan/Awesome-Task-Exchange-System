import { CreateUserHandler } from './create-user/create-user.handler';
import { DeactivateUserHandler } from './deactivate-user/deactivate-user.handler';

export const CommandHandlers = [CreateUserHandler, DeactivateUserHandler];
