import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { MongoSchema } from '../helpers';

@Schema({ timestamps: true })
class User {
  @IsString()
  @IsDefined()
  @Prop({ type: String, required: true })
  @ApiProperty({ type: String })
  name: string;
}

class UserDocument extends IntersectionType(MongoSchema, User) {}
const UserSchema = SchemaFactory.createForClass(User);
const USER_SCHEMA_NAME = 'user';

export { User, UserDocument, UserSchema, USER_SCHEMA_NAME };
