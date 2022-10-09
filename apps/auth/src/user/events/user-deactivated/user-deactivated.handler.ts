import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CudStreamAdapter } from "src/user/adapters/cud-stream.adapter";
import { UserDeactivatedEvent } from "./user-deactivated.event";

@EventsHandler(UserDeactivatedEvent)
export class UserDeactivatedHandler implements IEventHandler<UserDeactivatedEvent> {
    constructor(private readonly cudStreamAdapter: CudStreamAdapter) {}

    async handle(event: UserDeactivatedEvent): Promise<void> {
        this.cudStreamAdapter.publishUserDeactivatedEvent({
            event: 'UserDeactivated',
            payload: event.id
          });
    }
}