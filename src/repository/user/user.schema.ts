import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IntersectionType } from '@nestjs/swagger';
import { MongoSchema } from '../helpers';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  name: string;
}

export class UserDocument extends IntersectionType(MongoSchema, User) {}

export const UserSchema = SchemaFactory.createForClass(User);

export const USER_SCHEMA_NAME = 'user';
