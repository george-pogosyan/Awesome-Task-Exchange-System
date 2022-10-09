import { TaskAssignedViewUpdater } from './task-assigned/task-assigned.updater';
import { TaskCreatedViewUpdater } from './task-created/task-created.updater';
import { TaskFinishedViewUpdater } from './task-finished/task-finished.updater';
import { UserCreatedViewUpdater } from './user-created/user-created.updater';
import { UserDeactivatedViewUpdater } from './user-deactivated/user-deactivated.updater';

export const EventHandlers = [];
export const ViewUpdaters = [
  TaskCreatedViewUpdater,
  UserCreatedViewUpdater,
  TaskAssignedViewUpdater,
  TaskFinishedViewUpdater,
  UserDeactivatedViewUpdater
];
