import { IViewUpdater, ViewUpdaterHandler } from "@lib/event-sourcing";
import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserSchema } from "src/shemas/user.schema";
import { UserDeactivatedEvent } from "./user-deactivated.event";

@ViewUpdaterHandler(UserDeactivatedEvent)
export class UserDeactivatedViewUpdater implements IViewUpdater<UserDeactivatedEvent> {
    #logger = new Logger(UserDeactivatedViewUpdater.name);
    constructor(
        @InjectModel(UserSchema.name)
        private readonly model: Model<UserSchema & Document>,
    ) { }

    async handle(event: UserDeactivatedEvent): Promise<void> {
        try {
            await this.model.updateOne({ id: event.id }, { $set: { isActive: false } }, { upsert: true })
        } catch (error) {
            this.#logger.error(error)
        }
    }
}