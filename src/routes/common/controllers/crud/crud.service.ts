import { Injectable } from '@nestjs/common';
import { RepositoryService } from '@repository';

@Injectable()
export class CrudService<T> {
  constructor(private readonly base: RepositoryService<T>) {}

  async _get(id: string) {
    return this.base.lookById(id);
  }

  async _pagination(query: any) {
    return this.base.pagination({
      pagination: query,
    });
  }

  async _create(payload: T) {
    return this.base.create(payload);
  }

  async _update(id: string, changes: Partial<T>) {
    return this.base.update(id, changes);
  }

  async _remove(id: string) {
    return this.base.remove(id);
  }
}
