import { AssignTaskHandler } from './assign-task/assign-task.handler';
import { CreateTaskHandler } from './create-task/create-task.handler';
import { CreateUserHandler } from './create-user/create-user.handler';
import { DeactivateUserHandler } from './deactivate-user/deactivate-user.handler';
import { FinishClassHandler } from './finish-task/finish-task.handler';
import { ReshufleTasksHandler } from './reshufle-tasks/reshufle-tasks.handler';

export const CommandHandlers = [
  CreateTaskHandler,
  ReshufleTasksHandler,
  FinishClassHandler,
  CreateUserHandler,
  DeactivateUserHandler,
  AssignTaskHandler
];
