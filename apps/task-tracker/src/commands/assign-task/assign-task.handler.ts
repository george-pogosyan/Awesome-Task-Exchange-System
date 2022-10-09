import { StoreEventBus } from "@lib/event-sourcing";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task } from "src/models/task.model";
import { UserSchema } from "src/shemas/user.schema";
import { AssignTaskCommand } from "./assign-task.command";

@CommandHandler(AssignTaskCommand)
export class AssignTaskHandler implements ICommandHandler<AssignTaskCommand> {
    constructor(
        private readonly eventBus: StoreEventBus,
        @InjectModel(UserSchema.name)
        private readonly userModel: Model<UserSchema & Document>,
    ) { }

    async execute({ id }: AssignTaskCommand): Promise<void> {
        const usersForAssign = (await this.userModel
          .find({ role: 'worker', isActive: true }, { _id: 0, id: 1 })
          .lean()) as { id: string }[];
    
        const task = new Task(id)
          .assignTask(usersForAssign);
    
        this.eventBus.publishAll(task.getUncommittedEvents());
      }
}