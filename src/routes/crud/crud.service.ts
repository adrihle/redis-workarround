import { Inject, Injectable } from '@nestjs/common';
import { RepositoryService } from '@repository/helpers';

@Injectable()
export class CrudService<T> {
  @Inject('REPOSITORY')
  private readonly base: RepositoryService<T>;

  get() {
    console.log(this.base);
    return this.base.look();
  }
}
