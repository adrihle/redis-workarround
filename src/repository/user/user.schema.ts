import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IntersectionType } from '@nestjs/swagger';
import { MongoSchema } from '../helpers';

@Schema({ timestamps: true })
class User {
  @Prop({ type: String, required: true })
  name: string;
}

class UserDocument extends IntersectionType(MongoSchema, User) {}
const UserSchema = SchemaFactory.createForClass(User);
const USER_SCHEMA_NAME = 'user';

export { User, UserDocument, UserSchema, USER_SCHEMA_NAME };
