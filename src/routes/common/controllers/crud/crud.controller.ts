import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PaginationQueryDTO } from '@routes/common/dtos';
import { RepositoryService } from '@repository';
import { ClassConstructor } from 'class-transformer';
import { validateRequestObject } from '@routes/common';
import { CrudService } from './crud.service';
import { Pipes } from '@providers';

const { MongoIdValidation } = Pipes;

const BASE_CRUD = 'crud';
const PARAM_ID_BASE_CRUD = `${BASE_CRUD}/:id`;

export abstract class CrudController<T> extends CrudService<T> {
  constructor(
    private readonly repository: RepositoryService<T>,
    private readonly dto: ClassConstructor<T>,
  ) {
    super(repository);
  }

  @Get(PARAM_ID_BASE_CRUD)
  crudGet(@Param('id', MongoIdValidation) id: string) {
    return this._get(id);
  }

  @Get(BASE_CRUD)
  crudPagination(@Query() query: PaginationQueryDTO) {
    return this._pagination(query);
  }

  @Post(BASE_CRUD)
  crudCreate(@Body() body: T) {
    validateRequestObject<T>(this.dto, body);
    return this._create(body);
  }

  @Put(PARAM_ID_BASE_CRUD)
  crudUpdate(
    @Param('id', MongoIdValidation) id: string,
    @Body() body: Partial<T>,
  ) {
    validateRequestObject<T>(this.dto, body);
    return this._update(id, body);
  }

  @Delete(PARAM_ID_BASE_CRUD)
  crudRemove(@Param('id', MongoIdValidation) id: string) {
    return this._remove(id);
  }
}
