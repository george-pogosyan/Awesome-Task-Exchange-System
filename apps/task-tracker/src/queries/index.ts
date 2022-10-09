import { GetAllOpenedTasksHandler } from './get-all-opened-tasks/get-all-opened-tasks.handler';
import { GetAllTasksHandler } from './get-all-tasks/get-all-tasks.handler';

export const QueryHandlers = [GetAllTasksHandler, GetAllOpenedTasksHandler];
