import { UserCreatedHandler } from './user-created/user-created.handler';
import { UserCreatedViewUpdater } from './user-created/user-created.updater';
import { UserDeactivatedHandler } from './user-deactivated/user-deactivated.handler';
import { UserDeactivatedViewUpdater } from './user-deactivated/user-deactivated.updater';

export const EventsHandlers = [UserCreatedHandler, UserDeactivatedHandler];
export const ViewUpdaters = [UserCreatedViewUpdater, UserDeactivatedViewUpdater];
