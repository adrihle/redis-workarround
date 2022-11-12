import { Inject, Injectable } from '@nestjs/common';
import { User, UserRepository } from '@repository';

@Injectable()
export class UserService {
  @Inject()
  private readonly repository: UserRepository;

  async list(query: any = {}) {
    const { page, offset } = query;
    return this.repository.pagination({
      pagination: {
        page,
        offset,
      },
    });
  }

  async get(id: string) {
    return this.repository.lookById(id);
  }

  async create(user: User) {
    return this.repository.create(user);
  }
}
