import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RepositoryService } from '@repository';
import { CrudService } from './crud.service';

const BASE_CRUD = 'crud';
const PARAM_ID_BASE_CRUD = `${BASE_CRUD}/:id`;

export abstract class CrudController<T> extends CrudService<T> {
  constructor(private readonly repository: RepositoryService<T>) {
    super(repository);
  }

  @Get(PARAM_ID_BASE_CRUD)
  crudGet(@Param('id') id: string) {
    return this._get(id);
  }

  @Get(BASE_CRUD)
  crudPagination(@Query() query: any = {}) {
    return this._pagination(query);
  }

  @Post(BASE_CRUD)
  crudCreate(@Body() body: T) {
    return this._create(body);
  }

  @Put(PARAM_ID_BASE_CRUD)
  crudUpdate(@Param('id') id: string, @Body() body: Partial<T>) {
    return this._update(id, body);
  }

  @Delete(PARAM_ID_BASE_CRUD)
  crudRemove(@Param('id') id: string) {
    return this._remove(id);
  }
}
