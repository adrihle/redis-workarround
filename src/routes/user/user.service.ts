import { Inject, Injectable } from '@nestjs/common';
import { User, UserRepository } from '@repository';

@Injectable()
export class UserService {
  @Inject()
  private readonly repository: UserRepository;

  async list() {
    return this.repository.list();
  }

  async get(id: string) {
    return this.repository.get(id);
  }

  async create(user: User) {
    return this.repository.create(user);
  }
}
