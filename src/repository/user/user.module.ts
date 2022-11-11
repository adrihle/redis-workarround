import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, USER_SCHEMA_NAME } from './user.schema';
import { UserRepository } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_SCHEMA_NAME,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
