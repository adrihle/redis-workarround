import { Inject, Injectable } from '@nestjs/common';
import { RepositoryService } from '@repository/helpers';
import { ClassConstructor } from 'class-transformer';

export const REPOSITORY_TOKEN = 'REPOSITORY';
@Injectable()
export class CrudService<T> {
  @Inject(REPOSITORY_TOKEN)
  private readonly base: RepositoryService<ClassConstructor<T>>;

  async _get(id: string) {
    return this.base.lookById(id);
  }

  async _pagination(query: any) {
    return this.base.pagination({
      pagination: query,
    });
  }

  async _create(payload: ClassConstructor<T>) {
    return this.base.create(payload);
  }

  async _update(id: string, changes: Partial<T>) {
    return this.base.update(id, changes);
  }

  async _remove(id: string) {
    return this.base.remove(id);
  }
}
