import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { TaskSchema } from "src/shemas/task.schema";
import { GetAllOpenedTasksQuery } from "./get-all-opened-tasks.query";

@QueryHandler(GetAllOpenedTasksQuery)
export class GetAllOpenedTasksHandler implements IQueryHandler<GetAllOpenedTasksQuery> {
    constructor(
        @InjectModel(TaskSchema.name)
        private readonly model: Model<TaskSchema & Document>,
    ) { }
    
    async execute(): Promise<(TaskSchema & Document)[]> {
        return this.model
            .find({ isOpen: true }, { _id: 0 })
            .populate({ path: 'assigner', select: { _id: 0, assignerId: 0 } });
    }
}