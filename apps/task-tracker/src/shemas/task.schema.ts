import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isUUID } from 'class-validator';
import { ObjectId } from 'mongodb';
import { UserSchema } from './user.schema';

@Schema({
  timestamps: false,
  versionKey: false,
  collection: 'tasks-mv',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
class TaskSchema {
  @Prop({
    type: String,
    validators: isUUID,
    required: true,
    unique: true,
    index: true,
  })
  id: string;

  @Prop({
    type: String,
    index: true,
    default: '',
  })
  title: string;

  @Prop({
    type: String,
    default: '',
  })
  description: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  isOpen: boolean;

  @Prop({
    type: String,
    default: '',
  })
  assignerId: any;
}

const CompiledTaskSchema = SchemaFactory.createForClass(TaskSchema);

CompiledTaskSchema.virtual('assigner', {
  ref: UserSchema.name,
  localField: 'assignerId',
  foreignField: 'id',
  justOne: true, // for many-to-1 relationships
});

export { CompiledTaskSchema, TaskSchema };
