import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, USER_SCHEMA_NAME } from './user.schema';

@Injectable()
export class UserRepository {
  @InjectModel(USER_SCHEMA_NAME)
  private readonly model: Model<User>;

  async list(): Promise<UserDocument[]> {
    return this.model.find().lean();
  }

  async get(id: string): Promise<UserDocument> {
    return this.model.findById(id).lean();
  }

  async create(user: User): Promise<UserDocument> {
    const userModel = new this.model(user);
    await userModel.save();
    return this.get(String(userModel._id));
  }
}
