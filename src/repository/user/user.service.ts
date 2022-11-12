import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryService } from '../helpers/repository.service';
import { User, USER_SCHEMA_NAME } from './user.schema';

@Injectable()
export class UserRepository extends RepositoryService<User> {
  constructor(@InjectModel(USER_SCHEMA_NAME) UserModel: Model<User>) {
    super(UserModel);
  }
}
