import { Prop, Schema } from '@nestjs/mongoose';
import { IUSER_ROLE, USER_ROLES } from '../constants';
import { isUUID, isEmail } from 'class-validator';

@Schema({
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
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
    lowercase: true,
    validate: isEmail,
    maxlength: 255,
    minlength: 6,
    index: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    default: '',
  })
  name: string;

  @Prop({
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: [true, 'PASSWORD_IS_BLANK'],
  })
  password: string;

  @Prop({
    type: String,
    enum: {
      values: Object.values(USER_ROLES),
    },
    default: USER_ROLES.worker,
  })
  role: IUSER_ROLE;

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive: string;
}
