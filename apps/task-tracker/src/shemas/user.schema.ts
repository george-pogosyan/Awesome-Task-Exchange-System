import { Prop, Schema } from '@nestjs/mongoose';
import { isUUID } from 'class-validator';

@Schema({
  timestamps: false,
  versionKey: false,
  collection: 'users-mv',
})
export class UserSchema {
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
    default: '',
  })
  name: string;

  @Prop({
    type: String,
    default: '',
  })
  role: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive: string;
}
